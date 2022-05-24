import { Flex, Image, Text } from "../../elements";

const Participants = ({
  participant,
  deleteParticipant,
  chatAdminId,
  loggedUser,
}) => {
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
              src={participant.userImage}
              styles={{ width: "100%", height: "100%" }}
            />
          </Flex>
          <Text
            styles={{ fontWieght: "400", fontSize: "16px", lineHeight: "19px" }}
          >
            {participant.User_userName}
          </Text>
        </Flex>
        {loggedUser.userId === chatAdminId ||
        loggedUser.userId === participant.User_userId ? (
          <>
            <div>
              <Text
                className="hover-event"
                styles={{
                  fontSize: "30px",
                  fontWeight: "700",
                  color: "#FF5C00",
                }}
                _onClick={() => {
                  deleteParticipant(participant);
                }}
              >
                <span
                  className="change-color-to-black"
                  style={{ transition: "color 0.3s ease-out" }}
                >
                  +
                </span>
              </Text>
            </div>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};

export default Participants;
