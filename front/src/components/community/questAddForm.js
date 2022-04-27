import { useState } from "react";
import { Container, Grid } from "react-mui";
import Style from "../../../App.module.css";

const questAddForm = ({ user, quests, dispatch, setIsAdding }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuest = await Api.post(`questboard/create`, {
        writer: user.id,
        title,
        description,
      });

      dispatch({
        type: "ADD",
        payload: newQuest.data,
      });

      setIsAdding(false);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <Grid onSubmit={handleSubmit}>
      <Grid controlId="formBasicTitle">
        <Container type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Grid>

      <Grid controlId="formBasicDescription" className="mt-3">
        <Container class="form-control" placeholder="본문" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Grid>

      <Grid className="mt-3 mb-3 text-center">
        <Grid sm={{ span: 20 }}>
          <button type="submit" className={[Style.confirmButton, Style.questAddButton].join(" ")}>
            확인
          </button>

          <button onClick={() => setIsAdding(false)} className={Style.cancelButton}>
            취소
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default questAddForm;
