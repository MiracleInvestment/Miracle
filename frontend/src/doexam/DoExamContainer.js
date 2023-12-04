const DoExamContainer = ({no, title, date}) => {
  const uri = `http://${process.env.SERVER_ADDRESS}:3000/doExam/${no}`;
  return (
    <>
    <div className="bg-body-tertiary p-5 rounded mt-3">
      <h3>{title}</h3>
      <p className="lead">{date}에 생성된 "{title}" 입니다.</p>
      <a className="btn btn-lg btn-primary" href={uri} role="button">시험 응시하기 &raquo;</a>
    </div>
    </>
  );
}

export default DoExamContainer;