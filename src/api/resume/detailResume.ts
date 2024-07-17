import axios from "axios";

async function DetailResumeApi(id: Number) {
  try {
    const response = await axios.get(
      `https://00f935c6-42a5-448a-8871-ff95c8a2f12a.mock.pstmn.io/resume/${id}`
    );

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
}

export default DetailResumeApi;
