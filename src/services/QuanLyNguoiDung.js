import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  dangNhap = (account) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, account);
  };
  layThongTinNguoiDung = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
