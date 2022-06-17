import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Cascader,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

export default function Showtime() {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();
        console.log(result);
        setState({ ...state, heThongRapChieu: result.data.content });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const optionsHeThongRap = state.heThongRapChieu?.map((htr, index) => {
    return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
  });

  const optionsCumRapChieu = state.cumRapChieu?.map((crc, index) => {
    return { label: crc.tenCumRap, value: crc.maCumRap };
  });

  const onChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.layThongTinCumRapTheoHeThong(value);
      console.log(result.data.content);
      setState({ ...state, cumRapChieu: result.data.content });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeCumHeThongRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const onOK = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        let result = await quanLyDatVeService.taoLichChieu(values);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label="Hệ thống rạp">
        <Select
          options={optionsHeThongRap}
          onChange={onChangeHeThongRap}
          placeholder="Please select"
        />
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select
          options={optionsCumRapChieu}
          onChange={onChangeCumHeThongRap}
          placeholder="Please select"
        />
      </Form.Item>

      <Form.Item label="Ngày giờ chiếu">
        <DatePicker
          format={`DD/MM/YYYY hh:mm:ss`}
          onChange={onChangeDate}
          showTime
          onOk={onOK}
        />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber onChange={onChangeNumber} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
