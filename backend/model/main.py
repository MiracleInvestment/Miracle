from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from inference import output_sbert
import requests
import json

app = FastAPI()

class Answer(BaseModel):
    answers: List[str]

@app.get("/")
async def root():
    return {"hello": "Hi"}

@app.post("/exam/{examId}/submit")
async def submit_exam(studentId: str, examId: int, answers: Answer):
    # exam = db.query(Exam).filter(Exam.ExamID==examId).first()
    
    # if exam is None:
    #     raise HTTPException(status_code=404, detail="Exam not found")
    
    # questions = db.query(ExamQuestion).filter(ExamQuestion.ExamID==exam.ExamID).all()

    # questions = somekindofbackendserverthing()

    # questions = [{'QuestionText': "여러 제과점이 서로 경쟁을 하면 소비자에게 어떤 점이 좋을까요?",
    #         "ModelAnswer": "제품의 가격이 낮아지고, 품질이 올라간다(좋아진다, 높아진다). 또 제품의 다양성이 증가하고, 소비자들은 더 좋은 혜택을 받을 수 있다.",
    #         "Keyword": [
    #             "가격",
    #             "품질",
    #             "다양성",
    #             "혜택"
    #         ]},
    #         {"QuestionText": "높은 산에서 과자봉지가 부풀어 오르는 이유는 무엇일까요?",
    #         "ModelAnswer": "고도가 높아지면 공기의 압력이 낮아지는데, 온도가 일정할 때 압력이 작아지면 기체의 부피는 증가하므로 과자 봉지 내부 기체의 부피가 증가하기 때문이다.",
    #         "Keyword": [
    #             "압력",
    #             "공기",
    #             "고도",
    #             "온도",
    #             "부피"
    #         ]}]
    api_url = f"http://34.22.91.24:8000/exam/{examId}/getQuestions"
    resp = requests.get(api_url)
    if resp.status_code == 200:
        # API 응답을 JSON 형식으로 파싱
        questions = resp.json()
        print(questions)
    else:
        print(f"Error: {resp.status_code}")
        print(resp.text)

    resjson = {
        "subject": examId,
        "student_id": studentId,
        "problem": [
        ]
    }

    for i, q in enumerate(questions):
        keywordslist = q['Keywords'].split(', ')

        temp = {
        "question": q['QuestionText'],
        "gold_answer": q['ModelAnswer'],
        "keywords": keywordslist,
        "answers": [answers.answers[i]]
        }
        resjson["problem"].append(temp)

    res = output_sbert(resjson)

    for key, value in res.items():
        temp = {
            'StudentID': studentId,
            'ExamID': examId,
            'QuestionID': int(key) + 1,
            'StudentAnswer': resjson["problem"][key]['answers'][0],
            'Score': value
        }
        # payload.append(temp)
        payload = json.dumps(temp)

        save_url = f"http://34.22.91.24:8000/exam/{examId}/saveResult"
        resp = requests.post(save_url, data=payload)
        if resp.status_code == 200:
            pass
        else:
            print(f"Error: {resp.status_code}")
            print(resp.text)

    # payload_str = json.dumps(payload)
    # save_url = f"http://34.22.91.24:8000/exam/{examId}/saveResult"
    # resp = requests.post(save_url, data=payload_str)
    # if resp.status_code == 200:
    #     pass
    # else:
    #     print(f"Error: {resp.status_code}")
    #     print(resp.text)

    return res