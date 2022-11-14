export const showPostInfo = (
  title: string,
  postImg: string = '',
  content: string,
  like: number,
  userImg: string,
  nickname: string,
) => {
  return `
  <div style="position: relative;">
    <div classname="box" style='width: 410px; height: 150px; display: flex; padding: 5px; border-radius: 3px; background-color: rgba(0,0,0, 0.7); padding: 2px 12px 2px 12px;'>
      <div classname="tcn" style='display: flex; flex-direction: column; flex: 1;'>
        <h3 style="margin: 0; height: 25%; color: white; line-height: 55px; width: 250px;">${title}</h3>
        <p style="margin: 0; flex: 1; color: white; font-size: 0.8em; padding-top: 10px; width: 250px; white-space: normal">${content}</p>
        <div classname="nickname-hits" style="height: 28%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-top: 0.8px solid rgba(255, 255, 255, 0.6)">
          <div classname="user" style="display: flex; align-items: center;">
            <img src='${userImg}' alt='profileimg' style='width: 30px; height: 30px; border-radius: 50%;'/>
            <p style="display: inline; margin: 0 0 0 5px; color: rgb(245, 245, 245); font-size: 0.83em;">${nickname}</p>
          </div>
          <small style='color: rgb(211, 211, 211);'>조회수: ${like}</small>
        </div>
      </div>
      <div classname="img-box"; style="display: flex; align-items: center; margin-left: 15px;">
        <img src="http://localhost:8080/${
          postImg ? 'uploads/' + postImg : 'default-images/default-post-image.png'
        }" alt="post-image" style="width: 120px; height: 120px; border-radius: 5px;" />
      </div>
    </div>
    <div style="width: 400px; height: 30px; position: relative; overflow: hidden;">
      <div style="width: 40px; height: 40px; background-color: rgba(0,0,0, 0.7); position: absolute; transform: rotate(45deg); top: -28px; left: 181px;"></div>
    </div>
  </div>
  `;
};
