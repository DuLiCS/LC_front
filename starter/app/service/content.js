import { MovieDao } from '../dao/movie';
import { MusicDao } from '../dao/music';
import { SentenceDao } from '../dao/sentence';
import { config, NotFound } from 'lin-mizar';

class Content {
  static async editContent (id, params) {
    params['image'] = params['image'].split(config.getItem('localMainImgUrlPrefix'))[1]
    switch (params['type']) {
      case 100:
        delete params['url'];
        MovieDao.editMovie(id, params);
        break;
      case 200:
        MusicDao.editMusic(id, params);
        break;
      case 300:
        delete params['url'];
        SentenceDao.editSentence(id, params);
        break;
      default:
        throw new NotFound({ msg: '内容不存在' });
    }
  }
  static async getContentList () {
    const movieList = await MovieDao.getMovieList();
    const musicList = await MusicDao.getMusicList();
    const sentenceList = await SentenceDao.getSentenceList();

    let res = [];
    res.push.apply(res, movieList);
    res.push.apply(res, musicList);
    res.push.apply(res, sentenceList);

    res.sort((a, b) => b.created_at.localeCompare(a.created_at));
    return res;
  }
  static async addContent (v) {
    switch (v['type']) {
      case 100:
        // film
        delete v['url'];
        await MovieDao.addMovie(v);
        break;
      case 200:
        // music
        await MusicDao.addMusic(v);
        break;
      case 300:
        // sentence
        delete v['url'];
        await SentenceDao.addSentence(v);
        break;
      default:
        throw new NotFound({ msg: '内容不存在' });
    }
  }

  static async deleteContent (id, type) {
    switch (type) {
      case 100:
        MovieDao.deleteMovieById(id);
        break;
      case 200:
        MusicDao.deleteMusicById(id);
        break;
      case 300:
        SentenceDao.deleteSentenceById(id);
        break;
      default:
        throw new NotFound({ msg: '内容类型不存在' });
    }
  }
}

export { Content as ContentService };
