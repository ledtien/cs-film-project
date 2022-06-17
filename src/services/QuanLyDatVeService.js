import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
  layDanhSachPhongVe = (id) => {
    return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
  };

  datVePhim = (thongTinDatVe = new ThongTinDatVe()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
  };
  taoLichChieu = (formLichChieu) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`, formLichChieu);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
