import React from "react";
import { Button, Flex } from "../elements";
import { secondaryColor } from "../shared/color";
const RadioInput = props => {
  // city: 사용자의 위치가 2범위인지 3범위인지(일반 시인지, 특별,광역시인지)
  // cityRange: 현재 데이터를 불러오는 범위
  const { city, cityRange, setCityRange } = props;

  const buttonStyles = {
    width: "40px",
    height: "40px",
    backgroundColor: "transparent",
    borderRadius: "0",
    fontSize: "18px",
    fontWeight: "600",
  };

  const checkedButton = {
    width: "40px",
    height: "40px",
    backgroundColor: "transparent",
    borderRadius: "0",
    fontSize: "18px",
    fontWeight: "600",
    color: secondaryColor,
  };

  const checkHandler = id => {
    setCityRange(id);
  };

  return (
    <Flex
      styles={{
        flexDirection: "column",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      {city === 3 ? (
        <>
          <Button
            styles={cityRange === 1 ? checkedButton : buttonStyles}
            _onClick={() => checkHandler(1)}
          >
            시
          </Button>
          <Button
            styles={Object.assign(
              {
                borderTop: "1px solid rgba(0, 0, 0, 0.5)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
              },
              cityRange === 2 ? checkedButton : buttonStyles
            )}
            _onClick={() => checkHandler(2)}
          >
            구
          </Button>
          <Button
            styles={cityRange === 3 ? checkedButton : buttonStyles}
            _onClick={() => checkHandler(3)}
          >
            동
          </Button>
        </>
      ) : (
        <>
          <Button
            styles={cityRange === 2 ? checkedButton : buttonStyles}
            _onClick={() => checkHandler(2)}
          >
            시
          </Button>
          <Button
            styles={Object.assign(
              {
                borderTop: "1px solid rgba(0, 0, 0, 0.5)",
              },
              cityRange === 3 ? checkedButton : buttonStyles
            )}
            _onClick={() => checkHandler(3)}
          >
            동
          </Button>
        </>
      )}
    </Flex>
  );
};

export default RadioInput;
