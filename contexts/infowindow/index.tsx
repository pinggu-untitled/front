export const showPostInfo = (
  title: string,
  postImg: string = '',
  content: string,
  like: number,
  userImg: string,
  nickname: string,
) => {
  return `
  <div style="background-color: gray; width: 270px; height: 160px; display: flex; flex-direction: column; border-radius: 5px; overflow: hidden;">
      <h2 style="background-color: lightblue; margin: 0; padding: 0; text-align: center">${title}</h2>
      <div style="background-color: lightgray; display: flex; flex: 1">
        <div style="display: flex; align-items: center ">
          <img src=${postImg} alt="대표 미지" style="width: 90px; height: 90px" />
        </div>
        <div style="background-color: white; flex: 1; padding: 5px">
          ${content}
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; height: 80px; padding: 5px">
        <div>
          조회수: ${like}
        </div>
        <div style="display: flex; align-items: center">
          <div style="display: flex; align-items: center">
            <img src=${userImg} style="width: 25px; height: 25px; border-radius: 50%" />
          </div>
          <div style="marginLeft: 3px">
            ${nickname}
          </div>
        </div>
      </div>
    </div>
  `;
};
