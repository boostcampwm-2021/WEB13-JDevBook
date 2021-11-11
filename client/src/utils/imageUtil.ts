import { errorImage } from 'images';

const imageUtil = {
  /**
   * 이미지 너비와 높이를 반환하는 함수 (비동기)
   * @param url 이미지 source url
   * @returns [넘겨줬던 url, 원본 너비, 원본 높이]
   */
  getImageSize: async (url: string): Promise<[string, number, number]> => {
    return new Promise((res, rej) => {
      try {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          res([url, Number(img.width), Number(img.height)]);
        };
      } catch (err) {
        res([errorImage, 400, 400]);
        rej(err);
      }
    });
  },

  /**
   * 최적의 이미지 너비와 높이를 계산해서 반환해준다.
   * 각 너비와 높이는 target으로 지정한 값을 넘지 않도록 구성했다.
   * @param target 컨테이너의 너비 혹은 높이. 새로운 너비와 높이는 이 값을 넘지 않는다.
   * @param width 원본 너비
   * @param height 원본 높이
   * @returns [새로운 너비, 새로운 높이]
   */
  getImageFitSize: (target: number, width: number, height: number) => {
    if (width === height) {
      return [target, target];
    }
    if (width > height && width > target) {
      return [target, Math.floor((height * target) / width)];
    } else if (width < height && height > target) {
      return [Math.floor((width * target) / height), target];
    } else {
      return [width, height];
    }
  }
};

export default imageUtil;
