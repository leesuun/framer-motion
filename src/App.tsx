import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  position: relative;
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigBox = styled(motion.div)`
  width: 350px;
  height: 250px;
  background-color: white;
`;
const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: black;
  box-shadow: 3px 3px 3px grey;
  border-radius: 25px;
  position: absolute;
`;

const SwitchBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  padding: 5px;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  float: right;
  border: none;
  background-color: inherit;
  font-size: 18px;
  cursor: pointer;
`;

const box = ["1", "2", "3", "4"];

function App() {
  const [isOverlay, setIsOverlay] = useState(false);
  const [isCircleRight, setisCircleRight] = useState(true);
  const [selectedId, setSelectedId] = useState(String);
  const onMoveCircle = () => setisCircleRight((prev) => !prev);
  const showOverlay = (id: string) =>
    setIsOverlay((prev) => {
      setSelectedId(id);
      return !prev;
    });

  return (
    <>
      <Wrapper>
        <h1>Framer-motion</h1>
        <Grid>
          <AnimatePresence>
            {box.map((index) => (
              <Box
                style={{
                  originX: index === "1" || index === "3" ? 1 : 0,
                  originY: index === "1" || index === "2" ? 1 : 0,
                }}
                onClick={() => showOverlay(index)}
                layoutId={"box_" + index}
                key={"circle_" + index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                {index === "2" && isCircleRight === true ? (
                  <Circle transition={{ type: "tween" }} layoutId="circle" />
                ) : null}
                {index === "3" && isCircleRight === false ? (
                  <Circle transition={{ type: "tween" }} layoutId="circle" />
                ) : null}
                {index}
              </Box>
            ))}
          </AnimatePresence>
        </Grid>
        <SwitchBtn
          onClick={onMoveCircle}
          style={{ color: isCircleRight ? "red" : "blue" }}
        >
          Switch
        </SwitchBtn>
        <AnimatePresence>
          {isOverlay ? (
            <Overlay>
              <BigBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layoutId={"box_" + selectedId}
              >
                <CloseBtn onClick={() => showOverlay(selectedId)}>❌</CloseBtn>
              </BigBox>
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default App;
