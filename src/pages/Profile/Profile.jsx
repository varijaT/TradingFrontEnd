import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import AccountVarificationForm from "./AccountVarificationForm";
import { VerifiedIcon } from "lucide-react";
import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  // Extract user data
  const {
    email,
    fullName,
    dateOfBirth,
    nationality,
    address,
    city,
    postcode,
    country,
    mobile,
    twoFactorAuth,
    verified,
  } = auth.user || {};

  const handleEnableTwoStepVerification = (otp) => {
    console.log("EnableTwoStepVerification", otp);
    dispatch(
      enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp })
    );
  };

  const handleVerifyOtp = (otp) => {
    console.log("OTP - ", otp);
    dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }));
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email :</p>
                  <p className="text-gray-500">{email || "N/A"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Full Name :</p>
                  <p className="text-gray-500">{fullName || "N/A"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Date Of Birth :</p>
                  <p className="text-gray-500">{dateOfBirth || "N/A"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Nationality :</p>
                  <p className="text-gray-500">{nationality || "N/A"} </p>
                </div>
              </div>
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address :</p>
                  <p className="text-gray-500">{address || "N/A"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">City :</p>
                  <p className="text-gray-500">{city || "N/A"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Postcode :</p>
                  <p className="text-gray-500">{postcode || "N/A"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Country :</p>
                  <p className="text-gray-500">{country || "N/A"} </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                {twoFactorAuth?.enabled ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>{"Enabled"}</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enable Two-Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="px-10 pt-5 text-center">
                        Verify Your Account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm
                      handleSubmit={handleEnableTwoStepVerification}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:flex gap-5 mt-5">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 ">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{email || "N/A"}</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Password :</p>
                <Button variant="secondary">Change Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>Account Status</CardTitle>
                {verified ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>Verified</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Pending</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{email || "N/A"}</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Mobile :</p>
                <p>{mobile || "N/A"}</p>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Verify Account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="px-10 pt-5 text-center">
                        Verify Your Account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleVerifyOtp} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
