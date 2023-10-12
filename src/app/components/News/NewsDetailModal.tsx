import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface NewsDetailModal {
  open: boolean;
  setOpen: Function;
  description: string;
}

const NewsDetailModal: FC<NewsDetailModal> = ({
  open,
  setOpen,
  description,
}) => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "ada",
          prompt: `Summarize this: ${description}`,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );
      setSummary(response.data.choices[0].text);
    } catch (err) {
      setSummary("Needs premium access to use this feature :(");
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Description
        </Typography>
        <Typography className="mt-4" id="modal-modal-description">
          {description}
        </Typography>
        <Button
          onClick={fetchSummary}
          className="block mx-auto mt-4"
          variant="text"
          disabled={loading}
        >
          Summarize! (One Line)
        </Button>
        {summary && (
          <div className="mt-4" id="modal-modal-footer">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Summary
            </Typography>
            <Typography className="mt-4" id="modal-modal-summary">
              {summary}
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default NewsDetailModal;
