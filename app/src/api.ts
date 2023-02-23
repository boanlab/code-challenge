// 퀴즈들 불러오기
export async function fetchQuiz() {
  const response = await fetch(`http://10.0.20.119:8080/db`);
  const json = await response.json();
  return json;
}
