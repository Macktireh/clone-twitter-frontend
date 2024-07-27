import ButtonCustom from "@/widgets/ButtonCustom";

interface propsTypes {
  text: string;
  nameClass?: string;
  isDisabled?: boolean;
}

export const GoogleLoginButton: React.FC<propsTypes> = ({ text, nameClass, isDisabled }) => {
  const handleReachGoogle = () => {
    const GoogleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const GoogleCallBackURI = process.env.REACT_APP_GOOGLE_CALLBACK_URL;
    window.location.replace(
      `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${GoogleCallBackURI}&prompt=consent&response_type=code&client_id=${GoogleClientID}&scope=openid%20email%20profile&access_type=offline`
    );
  };

  return (
    <ButtonCustom
      nameClass={nameClass}
      pic={"/static/svg/google.svg"}
      text={text}
      onClick={handleReachGoogle}
      isDisabled={isDisabled}
    />
  );
};
