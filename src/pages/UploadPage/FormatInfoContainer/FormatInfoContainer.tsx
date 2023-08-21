import { Button, Icon } from "components";
import React, { useState } from "react";
import "./FormatInfoContainer.scss";

export const FormatInfoContainer: React.FC = () => {
  const [result, setResult] = useState("");
  const handleClick = async () => {
    const result = await fetch("http://127.0.0.1:8055/items/public", {
      method: "get",
      headers: {
        'Access-Control-Allow-Origin' : 'no-cors'
      }
    });
    setResult(result.json.toString);
  };

  return (
    <div className="FormatInfoContainer">
      <Icon type="Wav" />
      <h3>Формат файла волнообразного звука</h3>
      <p>
        – один из наиболее распространенных аудиоформатов. Формат разработан
        компанией Microsoft (в соавторстве с IBM) и обычно является контейнером
        для несжатых аудиоданных с импульсно-кодовой модуляцией. Но может быть
        использован в качестве контейнера для хранения звука, обработанного
        другими аудиокодеками.
      </p>
    </div>
  );
};
