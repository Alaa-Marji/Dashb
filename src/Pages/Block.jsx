import axios from "axios";
import { useState } from "react";

export default function Block() {
  const [selected, setSelected] = useState([]);

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelected((prev) => {
      if (event.target.checked) {
        return [...prev, option];
      } else {
        return prev.filter((selectedOption) => selectedOption !== option);
      }
    });
  };

  const handleSubmit = () => {
    const url = ""; // Fill in your API endpoint here
    const data = {
      options: selected,
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log("hi"); // You can handle the response here
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
  };
  console.log(selected);
  return (
    <div>
      <label>
        <input type="checkbox" value="option1" onChange={handleOptionChange} />
        option1
      </label>
      <label>
        <input type="checkbox" value="option2" onChange={handleOptionChange} />
        option2
      </label>
      <label>
        <input type="checkbox" value="option3" onChange={handleOptionChange} />
        option3
      </label>
      <label>
        <input type="checkbox" value="option4" onChange={handleOptionChange} />
        option4
      </label>
      <label>
        <input type="checkbox" value="option5" onChange={handleOptionChange} />
        option5
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
