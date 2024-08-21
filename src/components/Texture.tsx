 
import { floors,vanityImages, walls } from "../components/data";
import { useMyContext } from "../Context";

const Texture = () => {
  const { handleWall, handleFloor,handleVanity } = useMyContext();
  console.log(floors);
  return (
    <div style={{ width: "100%",height:"100vh",overflow:"auto",paddingLeft: "10px"}}>
      <div style={{ fontSize: "30px", marginTop: "10px" }}>Floor</div>
      <div
        style={{
          display: "flex",
          padding: "20px 0px",
          flexDirection: "row",
          gap: "20px",
          height: "auto",
          flexWrap: "wrap",
        }}
      >
        {floors.map((item: any,index) => {
          return (
            <div
             key={index}
              onClick={() => {
                handleFloor(item.id);
              }}
            >
              <img
                style={{ cursor: "pointer" }}
                width={200}
                height={200}
                src={item?.image}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: "30px", marginTop: "10px" }}>Wall</div>
      <div
        style={{
          display: "flex",
          padding: "20px 0px",
          flexDirection: "row",
          gap: "20px",

          height: "auto",
          flexWrap: "wrap",
        }}
      >
        {walls.reverse().map((item: any,index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleWall(item.id);
              }}
            >
              <img
                style={{ cursor: "pointer" }}
                width={200}
                height={200}
                src={item?.image}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: "30px", marginTop: "10px" }}>Vanity</div>
      <div
        style={{
          display: "flex",
          padding: "20px 0px",
          flexDirection: "row",
          gap: "20px",

          height: "auto",
          flexWrap: "wrap",
        }}
      >
        {vanityImages.reverse().map((item: any,index) => {
          return (
            <div
             key={index}
              onClick={() => {
                handleVanity(item.id)
              }}
            >
              <img
                style={{ cursor: "pointer" }}
                width={200}
                height={200}
                src={item?.image}
                alt=""
              />
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Texture;
