import { jest } from '@jest/globals';
import mediaPath from '@utils/mediaPath';

test('test - mediaPath', () => {
  const sampleMedia = 'aadfadfagawed.png';
  const fn = mediaPath(sampleMedia);
  expect(fn).toEqual(`http://localhost:8080/uploads/profile/${sampleMedia}`);
});
