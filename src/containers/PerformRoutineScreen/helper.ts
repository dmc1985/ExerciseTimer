import SoundPlayer from 'react-native-sound-player';

export function playSound(fileName: string, fileType: string = 'mp3') {
  try {
    SoundPlayer.playSoundFile(fileName, fileType);
  } catch (e) {
    console.log('cannot play the sound file', e);
  }
}
