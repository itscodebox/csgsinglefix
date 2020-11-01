import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import './ShowPoint.css'

const ShowPoint = ({ username }) => {
  const [points, setPoints] = useState(null);
  useEffect(() => {
    db.collection("posts")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var oldComents = doc.data().comments;
          console.log(oldComents);
          //   To check the comment posted by current user
          const objIndex = oldComents.filter((obj) => obj.username == username);
          console.log('Objjjjjjjjjjjjjjjjjjjjjjjjjjjj');
          console.log(objIndex);
          var totalPoints =0;
          objIndex.map((obj) => {
            totalPoints = totalPoints + obj.likes;
          });
          setPoints(totalPoints);
        });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  } , []);

  return (
    <div id="points">
      <h5 id="points_value">{points}</h5>
      <img
        src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTkwIDI2OC4yLTEuOCAxLjgtMjguMiAzMGgtNjB2LTYwbDM0LjUwMS0zMCAyNS40OTkgMzB6IiBmaWxsPSIjZmRiZjAwIi8+PHBhdGggZD0ibTg4LjIgMjcwLTI4LjIgMzBoLTYwdi0zMHoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtMjcxIDI0MHY2MGgtMjExdi02MGwzMC0zMGgxNTF6IiBmaWxsPSIjZmY5MTAwIi8+PHBhdGggZD0ibTYwIDI3MGgyMTF2MzBoLTIxMXoiIGZpbGw9IiNmZjY0MWEiLz48cGF0aCBkPSJtOTAgMjA4LjItMS44IDEuOC0yOC4yIDMwaC02MHYtNjBsMzAtMzAgMzAgMzB6IiBmaWxsPSIjZmRiZjAwIi8+PHBhdGggZD0ibTI3MSAxODB2NjBoLTYwbC0zMC0zMCA2MC02MHoiIGZpbGw9IiNmZGJmMDAiLz48ZyBmaWxsPSIjZmY5MTAwIj48cGF0aCBkPSJtMCAyMTBoODguMmwtMjguMiAzMGgtNjB6Ii8+PHBhdGggZD0ibTI3MSAyMTB2MzBoLTYwbC0zMC0zMHoiLz48cGF0aCBkPSJtMjExIDE4MHY2MGgtMTUxdi02MGwzMC0zMGg5MXoiLz48L2c+PHBhdGggZD0ibTYwIDIxMGgxNTF2MzBoLTE1MXoiIGZpbGw9IiNmZjY0MWEiLz48cGF0aCBkPSJtOTAgMTQ4LjItMS44IDEuOC0yOC4yIDMwaC02MHYtNjBoMzBsMTUtMzAgMTUgMzB6IiBmaWxsPSIjZmRiZjAwIi8+PHBhdGggZD0ibTI3MSAxMjB2NjBoLTYwbC0zMC0zMCA2MC02MHoiIGZpbGw9IiNmZGJmMDAiLz48cGF0aCBkPSJtMCAxNTBoODguMmwtMjguMiAzMGgtNjB6IiBmaWxsPSIjZmY5MTAwIi8+PHBhdGggZD0ibTI3MSAxNTB2MzBoLTYwbC0zMC0zMHoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtMjExIDEyMHY2MGgtMTUxdi02MGwzMC0zMGg5MXoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtNjAgMTUwaDE1MXYzMGgtMTUxeiIgZmlsbD0iI2ZmNjQxYSIvPjxwYXRoIGQ9Im0xMjAgODguMi0xLjggMS44LTI4LjIgMzBoLTYwdi02MGwzMC0zMCAzMCAzMHoiIGZpbGw9IiNmZGJmMDAiLz48cGF0aCBkPSJtMzAxIDYwdjYwaC02MGwtMzAtMzAgMzAtMzAgMTUtMzAgMTUgMzB6IiBmaWxsPSIjZmRiZjAwIi8+PHBhdGggZD0ibTMwIDkwaDg4LjJsLTI4LjIgMzBoLTYweiIgZmlsbD0iI2ZmOTEwMCIvPjxwYXRoIGQ9Im0zMDEgOTB2MzBoLTYwbC0zMC0zMHoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtMjQxIDYwdjYwaC0xNTF2LTYwbDMwLTMwaDkxeiIgZmlsbD0iI2ZmOTEwMCIvPjxwYXRoIGQ9Im05MCA5MGgxNTF2MzBoLTE1MXoiIGZpbGw9IiNmZjY0MWEiLz48cGF0aCBkPSJtMjcxIDB2NjBoLTYwbC0zMC0zMCAzMC0zMHoiIGZpbGw9IiNmZGJmMDAiLz48cGF0aCBkPSJtOTAgMjguMi0xLjggMS44LTI4LjIgMzBoLTYwdi02MGg2MHoiIGZpbGw9IiNmZGJmMDAiLz48cGF0aCBkPSJtMCAzMGg4OC4ybC0yOC4yIDMwaC02MHoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtMjcxIDMwdjMwaC02MGwtMzAtMzB6IiBmaWxsPSIjZmY5MTAwIi8+PGc+PHBhdGggZD0ibTM0NiAxODBjLTkwLjkwMSAwLTE2NSA3NC4wOTktMTY1IDE2NXM3NC4wOTkgMTY3IDE2NSAxNjcgMTY2LTc2LjA5OSAxNjYtMTY3LTc1LjA5OS0xNjUtMTY2LTE2NXoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtNTEyIDM0NWMwIDkwLjkwMS03NS4wOTkgMTY3LTE2NiAxNjd2LTMzMmM5MC45MDEgMCAxNjYgNzQuMDk5IDE2NiAxNjV6IiBmaWxsPSIjZmY2NDFhIi8+PHBhdGggZD0ibTQ4MiAzNDVjMCA3NC4zOTktNjEuNjAxIDEzNy0xMzYgMTM3cy0xMzUtNjIuNjAxLTEzNS0xMzcgNjAuNjAxLTEzNSAxMzUtMTM1IDEzNiA2MC42MDEgMTM2IDEzNXoiIGZpbGw9IiNmZGJmMDAiLz48cGF0aCBkPSJtNDgyIDM0NWMwIDc0LjM5OS02MS42MDEgMTM3LTEzNiAxMzd2LTI3MmM3NC4zOTkgMCAxMzYgNjAuNjAxIDEzNiAxMzV6IiBmaWxsPSIjZmY5MTAwIi8+PHBhdGggZD0ibTQyMSAzMTVjMC0xOS41MDEtMTIuNTk5LTM2LTMwLTQyLjI5OXYtMzIuNzAxaC0zMHYzMGgtMzB2LTMwaC0zMHYzMGgtMzB2MzBoMzB2OTBoLTMwdjMwaDMwdjMwaDMwdi0zMGgzMHYzMGgzMHYtMzIuNzAxYzE3LjQwMS02LjI5OSAzMC0yMi43OTggMzAtNDIuMjk5IDAtMTEuNy00LjUwMS0yMS44OTktMTEuNy0zMCA3LjE5OS04LjEwMSAxMS43LTE4LjMgMTEuNy0zMHptLTQ1IDc1aC00NXYtMzBoNDVjOC40MDEgMCAxNSA2LjU5OSAxNSAxNXMtNi41OTkgMTUtMTUgMTV6bTAtNjBoLTQ1di0zMGg0NWM4LjQwMSAwIDE1IDYuNTk5IDE1IDE1cy02LjU5OSAxNS0xNSAxNXoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtNDA5LjMgMzQ1YzcuMiA4LjEwMSAxMS43IDE4LjMgMTEuNyAzMCAwIDE5LjUwMS0xMi41OTkgMzYtMzAgNDIuMjk5djMyLjcwMWgtMzB2LTMwaC0xNXYtMzBoMzBjOC40MDEgMCAxNS02LjU5OSAxNS0xNXMtNi41OTktMTUtMTUtMTVoLTMwdi0zMGgzMGM4LjQwMSAwIDE1LTYuNTk5IDE1LTE1cy02LjU5OS0xNS0xNS0xNWgtMzB2LTMwaDE1di0zMGgzMHYzMi43MDFjMTcuNDAxIDYuMjk5IDMwIDIyLjc5OCAzMCA0Mi4yOTkgMCAxMS43LTQuNTAxIDIxLjg5OS0xMS43IDMweiIgZmlsbD0iI2ZmNjQxYSIvPjwvZz48cGF0aCBkPSJtNjAgMGgxNTF2NjBoLTE1MXoiIGZpbGw9IiNmZjkxMDAiLz48cGF0aCBkPSJtNjAgMzBoMTUxdjMwaC0xNTF6IiBmaWxsPSIjZmY2NDFhIi8+PC9nPjwvc3ZnPg=="
        height="auto"
        width="40px"
      />
    </div>
  );
};

export default ShowPoint;
