import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postJoin = async (req, res) => {
  // console.log(req.body);
  const { id, name, mobile, email, password } = req.body;

  try {
    const user = await User.create({
      id,
      name,
      mobile,
      email,
      password,
      auth: 2,
      createdAt: Date.now(),
    });
    // console.log(user);
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, messafe: "에러가 발행했습니다." });
  }
};

export const postLogin = async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });
  if (!user) {
    return res.status(401).json({ ok: false, message: "아이디, 비밀번호를 확인해주세요!" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ ok: false, message: "아이디, 비밀번호를 확인해주세요!!" });
  }

  try {
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "24H" });
    res.cookie("accessToken", accessToken),
      {
        secure: true,
        httpOnly: false,
        smaeSite: "None",
      };
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, messafe: "에러가 발행했습니다." });
  }
};

export const loginSuccess = async (req, res) => {
  // console.log(req.cookies);
  try {
    const { accessToken } = req.cookies;

    const tempData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    // console.log(tempData);
    const id2 = tempData?.id;

    const loggedInUser = await User.findById(id2);
    const { id, mobile, email, name, auth, _id,missionCompleted } = loggedInUser;
    return res.status(200).json({
      ok: true,
      id,
      email,
      mobile,
      name,
      auth,
      userid: _id,
      missionCompleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, messafe: "에러가 발행했습니다." });
  }
};

export const postAddMission = async (req, res) => {
  try {
    // req.body.userId
    // req.body.missionId
    const {
      body: { userId, missionId },
    } = req;
    // console.log(body);

    const existing = await User.findById(userId);
    // console.log(existing);
    if (!existing) {
      return res.json({ result: 1, message: "로그인 정보가 없습니다." });
    }

    //에러처리 (이미 완료된 qr코드일때)
    if (existing.missionCompleted.includes(missionId)) {
      return res.json({ result: 3, message: "이미 승인된 QR코드입니다." });
    }

    // 에러처리 (정해진 qr코드가 아닐떄)
    const qrData = ["sun", "rain", "cloudy", "GUKBOB","JEJUPIG"];
    if (!qrData.includes(missionId)) {
      console.log("유효하지 않은 QR코드 입니다.");
      return res.json({ result: 2, message: "유효하지 않은 QR코드 입니다." });
    }

    const updatedUser = await User.findByIdAndUpdate( userId , {$push:{missionCompleted:missionId}});
    return res.status(200).json({ result: 0, message: "QR인증성공", updatedUser });
  } catch (error) {
    console.log(error);
  }
};
