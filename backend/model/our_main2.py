from lib2to3.pgen2 import token
from typing import List
from unicodedata import name
#from pydantic import BaseModel
#from fastapi import FastAPI

from util.read_input import preprocess
from score_logic import compute_final_score, getScore

import torch
import json
import numpy as np
import pandas as pd
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from sentence_transformers import SentenceTransformer
from keyword_checker import checker

from numpy import dot
from numpy.linalg import norm

from keyword_similarity import *



#global variable for pre-loading
#sentence similarity
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained("/home/oceanofglitta/server/Miracle/backend/model/sts.model")
LOAD_FROM = '/home/oceanofglitta/server/Miracle/backend/model/sts.model'
sbert_model = SentenceTransformer(LOAD_FROM)
sbert_model.cuda()

'''
#word similarity and matching
pos_tagger = Okt()
model_name = "./cc.ko.300.bin"
word_model = g.fasttext.load_facebook_model(model_name)
Fast_KS = Keyword_similarity(word_model, 0.35, pos_tagger)
'''


def sentences_predict(model, tokenizer, sent_A, sent_B):
    model.eval()
    tokenized_sent = tokenizer(
        sent_A,
        sent_B,
        padding=True,
        return_tensors="pt",
        truncation=True,
        add_special_tokens=True,
        max_length=64,
    )
    tokenized_sent.to("cuda:0")
 
    with torch.no_grad():  # 그라디엔트 계산 비활성화
        outputs = model(
            input_ids=tokenized_sent["input_ids"],
            attention_mask=tokenized_sent["attention_mask"],
            token_type_ids=tokenized_sent["token_type_ids"],
        )
    logits = outputs[0]
    logits = logits.detach().cpu().numpy()
    result = np.argmax(logits)

    if result == 0:
        result = "non_similar"
    elif result == 1:
        result = "similar"
    return result, logits


def load_refine_json_data(data):
    answers = data['answers']

    # answers = pd.read_csv("./example.csv")["answer"].to_list()  # example
    # tmp. 실제 json 데이터 찾아서 읽어야 함
    gold_answer = [data["gold_answer"]] * len(answers)
    return answers, gold_answer


#여기도 부를것
def sync_match_info(answer, keywords, keyword_num, whole_keyword_list, student_num):
    start_idx_list = []
    end_idx_list = []
    word_list = []
    match_info = {}
    match_info["keyword"] = []
    match_info["similarity_keyword"] = []
    match_info["start_idx"] = []
    empty_count = 0


    #keyword의 길이
    len_keywords = len(keywords)

    for i in range(len_keywords):
      
        #start_idx = whole_keyword_list[f"keyword_{i}"][f"student_{student_num}"][0]["start_idx"]
        #end_idx = whole_keyword_list[f"keyword_{i}"][f"student_{student_num}"][1]["end_idx"]

        words = whole_keyword_list[f"keyword_{i}"][f"student_{student_num}"]["word"]
        #start_idx_list.append(start_idx)
        #end_idx_list.append(end_idx)

        if words:
          word_list.append(words)
          match_info["keyword"].append(keywords[i])
        else:
          empty_count+=1

        '''
        if not start_idx:
            empty_count += 1
        else:
            match_info["keyword"].append(keywords[i])
        '''

    for i in range(len(match_info["keyword"])):
        if not match_info["keyword"][i] in answer:
            match_info["similarity_keyword"].append(match_info["keyword"][i])

    match_info["keyword"] = [word for word in match_info["keyword"] if word not in match_info["similarity_keyword"]]

    #match_info["start_idx"] = start_idx_list
    #match_info["end_idx"] = end_idx_list
    match_info["word"] = word_list

    keyword_score = (len_keywords - empty_count) / len_keywords

    return keyword_score, match_info


#여기 분를것
def make_problem_df(problem, problem_idx, sim_score, student_id, answers):
    new_data = {}
    new_data["problem_idx"] = problem_idx
    new_data["question"] = problem["question"]
    new_data["gold_answer"] = problem["gold_answer"]
    new_data["keywords"] = problem["keywords"]

    keyword_num, whole_keyword_list = make_keyword_list(new_data["keywords"], answers)
    print(keyword_num,whole_keyword_list)
    result = []
    result_dict = {}
    result_len = len(student_id)
    for i in range(result_len):
        result_dict = {}
        keyword_score, match_info = sync_match_info(answers[i], new_data["keywords"], keyword_num, whole_keyword_list, i)

        result_dict["student_id"] = student_id[i]
        result_dict["answer"] = answers[i]
        result_dict["sim_score"] = round(sim_score[i].astype(np.float64), 4)
        result_dict["keyword_score"] = keyword_score
        result_dict["total_score"] = round(sim_score[i] + keyword_score, 4)
        result_dict["match_info"] = match_info
        result.append(result_dict)

    new_data["result"] = result
    return new_data



def inference_model(data):

    output_dict = {}
    new_problem = []

    for i, problem in enumerate(data):
        # for i, problem in range(data["problem"][0]):
        problem_idx = i
        student_id, answers, gold_answer = load_refine_json_data(problem)
        result, logits = sentences_predict(model, tokenizer, answers, gold_answer)
        softmax = torch.nn.Softmax(dim=1)
        prob = softmax(torch.tensor(logits))
        ans = prob.argmax(dim=1)
        sim_score = prob.detach().cpu().numpy()[:, 0]

        individual_df = make_problem_df(problem, i, sim_score, student_id, answers)
        new_problem.append(individual_df)

          # 예시가 하나만 있기 때문에 들어가있는 break. 실제 json을 넘겨줄 시 지워야 한다
    output_dict["problem"] = new_problem
    #output_json = json.dumps(output_dict)
    # with open("./result.json", "w") as f:  # result 눈으로 확인하는 용도
    #     json.dump(output_dict, f, ensure_ascii=False, indent=4)
    return output_dict


##sbert


def get_similarity(ans, right_ans, use="cosine"):
    # Cosine Similarity
    if use == "cosine":
        return dot(ans, right_ans) / (norm(ans) * norm(right_ans))

    # Euclidean
    if use == "euclidean":
        if norm(ans - right_ans) == norm(ans - right_ans):
            return norm(ans - right_ans)
        else:
            return -1

    # Pearson
    if use == "pearson":
        return dot((ans - np.mean(ans)), (right_ans - np.mean(right_ans))) / (
                    (norm(ans - np.mean(ans))) * (norm(right_ans - np.mean(right_ans))))


def sentences_sbert_predict(emb_a, emb_b):
    results = []
    for idx, (a, b) in enumerate(zip(emb_a, emb_b)):
        sim_score = get_similarity(a, b, use="cosine")
        results.append(round(sim_score,2))
    return results


def inference_sbert_model(data):
    the_student_id = data['student_id']
    output_dict = {}
    new_problem = []
    # gold_answer = ['제과점끼리 경쟁 심화가 커질 수 있다.', '맛이 더 좋아질 수는 있따']
    # answers = ['제과점끼리 경쟁이 작아질 수 있다.', '더 좋은 맛을 누릴 수 있다'] # 경쟁이 커질 수 있다로 하면 낮게나옴
    for problem_idx, problem in enumerate(data["problem"]):
    # for i, problem in enumerate([1,3]):
        # for i, problem in range(data["problem"][0]):
        student_id = the_student_id
        answers, gold_answer = load_refine_json_data(problem)

        right_ans_emb = sbert_model.encode(gold_answer)
        stu_ans_emb = sbert_model.encode(answers)
        sim_score = sentences_sbert_predict(right_ans_emb, stu_ans_emb)
        keyword_num, whole_keyword_list = make_keyword_list(problem["keywords"], answers)
        keyword_score, match_info = sync_match_info(answers[0], problem["keywords"], keyword_num, whole_keyword_list, 0)
        # individual_df = make_problem_df(problem, problem_idx, sim_score, student_id, answers)
        print(sim_score, keyword_score)
        individual_df = {"question": problem['question'], "problem_idx": problem_idx, "sim_score": sim_score[0], "student_id": student_id, "answers": answers, 'keyword_score': keyword_score}
        new_problem.append(individual_df)


    output_dict["problem"] = new_problem
    # output_json = json.dumps(output_dict)
    # with open("./result.json", "w") as f:  # result 눈으로 확인하는 용도
    #     json.dump(output_dict, f, ensure_ascii=False, indent=4)
    return output_dict

'''
app = FastAPI()

class Problem(BaseModel):
    question: str
    gold_answer: str
    keywords: list
    answers : list

class ProblemList(BaseModel):
    problem: List[Problem]
'''

def output_sbert(thedata):
    # with open("/home/oceanofglitta/server/Miracle/backend/model/example.json", "r") as f:
    #     json_data = json.load(f)

    print(thedata)
    resDict = inference_sbert_model(thedata)
    return getScore(resDict)


if __name__=='__main__':
    print(output_sbert())

