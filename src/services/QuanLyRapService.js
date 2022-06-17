import { NHOM_GP } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
  layThongTinLichChieuTheoRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${NHOM_GP}`
    );
  };

  layThongTinLichChieuPhim = (id) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
  };

  layThongTinHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };

  layThongTinCumRapTheoHeThong = (maHeThong) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThong}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
