export class Food {
  maMonAn = 0;
  tenMonAn = "";
  giaTien = 0;

  constructor() {
    this.maMonAn = maMonAn;
    this.tenMonAn = tenMonAn;
    this.giaTien = giaTien;
  }
  getFoodInfo() {
    return {
      id: this.maMonAn,
      name: this.tenMonAn,
      price: this.giaTien,
      imgUrl: this.linkAnh,
    };
  }
}

export class Food1 extends Food {
  linkAnh = "";
  constructor() {
    super();
  }
}

export class Food2 extends Food {
  soLuong = 1;
  constructor() {
    super();
  }
  total = function () {
    let thanhTien = this.soLuong * this.giaTien;
    return thanhTien;
  };
}
