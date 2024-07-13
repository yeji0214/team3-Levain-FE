export const validatePassword = (password) => {
    if (password.length < 8 || password.length >= 15) {
        return { isValid: false, message: "비밀번호는 8자 이상, 15자 미만이어야 합니다." };
    }
    return { isValid: true, message: "" };
};
