import { Flex, Image, Text } from "../elements";

const Awaiters = ({ awaiter, addNewParticipant, chatAdminId, loggedUser }) => {
  return (
    <div style={{ width: "100%", marginTop: "10px" }}>
      <Flex
        styles={{
          borderBottom: "2px solid rgba(0, 0, 0, .2)",
          height: "auto",
          paddingBottom: "12px",
          justifyContent: "space-between",
        }}
      >
        <Flex
          styles={{
            width: "auto",
          }}
        >
          <Flex styles={{ height: "34px", width: "34px", marginRight: "15px" }}>
            <Image
              shape="circle"
              src={awaiter.userImage}
              styles={{ width: "100%", height: "100%" }}
            />
          </Flex>
          <Text
            styles={{ fontWieght: "400", fontSize: "16px", lineHeight: "19px" }}
          >
            {awaiter.User_userName}
          </Text>
        </Flex>
        {loggedUser.userId === chatAdminId ? (
          <>
            <Text
              className="hover-event change-color-to-orange"
              styles={{
                fontSize: "30px",
                fontWeight: "700",
                transition: "color 0.3s ease-out",
              }}
              _onClick={() => {
                addNewParticipant(awaiter);
              }}
            >
              +
            </Text>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};

export default Awaiters;
