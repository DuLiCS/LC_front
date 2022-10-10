import { MusicModel } from '../model/music';
import { MovieModel } from '../model/movie';
import { NotFound } from 'lin-mizar';
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

class Music {
  static async getMusicList(){
    const res = MusicModel.findAll()
    return res
  }

  static async addMusic (v) {
    return await MusicModel.create(v);
  }

  static async editMusic(id, params){
    const music = await MusicModel.findByPk(id)
    if (!music){
      throw new NotFound()
    }

    return await music.update({ ...params })
  }

  static async deleteMusicById(id) {
    return MusicModel.destroy({
      where: { id }
    })
  }
}

export { Music as MusicDao }
