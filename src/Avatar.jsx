import { User2 } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Avatar = ({ id, username }) => {
  const colors = [
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-red-200",
    "bg-pink-500",
  ];

  const userid = parseInt(id, 16);
  const colorIndex = userid % colors.length;
  const color = colors[colorIndex];
  return (
    <div
      className={
        " w-[145px] h-[155px] rounded-full flex flex-col items-center justify-center " +
        color
      }
    >
      <div className="text-center w-full text-[3rem]">
        {<User2 size={60} className="w-full" />}
      </div>
      <div className="pt-2">
        <span className="font-bold text-[0.9rem] capitalize">
          {username[0] + username[1]}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
