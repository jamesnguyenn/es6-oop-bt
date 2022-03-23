import { Food, Food1, Food2 } from "../models/Food.js";
import {
  checkID,
  showToastError,
  setLocalStorage,
  setEmptyInput,
} from "../method.js";
import {
  BAI_TAP_1_LOCAL_STORAGE,
  BAI_TAP_2_LOCAL_STORAGE,
} from "../constants.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const baiTap1 = (() => {
  const foodLists =
    JSON.parse(localStorage.getItem(BAI_TAP_1_LOCAL_STORAGE)) || [];

  const handleClickAddFoodButton = () => {
    const addBtn = $("#addBtn");
    addBtn.addEventListener("click", () => {
      const allInput = $$(".baiTap1 input");
      const [maMonAn, tenMonAn, giaTien, linkAnh] = allInput;

      //Check Type Of ID
      if (!Number(maMonAn.value))
        return showToastError("ID must be number type!");
      //Check ID Already Taken
      const food = checkID(maMonAn.value, foodLists);
      if (food) return showToastError("ID Already Taken !");

      //Check type of price
      if (!Number(giaTien.value))
        return showToastError("Price must be number type!");
      const newFood = new Food1();
      for (let i of allInput) {
        let { id, value } = i;
        newFood[id] = value;
      }
      foodLists.push(newFood);
      setLocalStorage(BAI_TAP_1_LOCAL_STORAGE, foodLists);
      setEmptyInput(maMonAn, tenMonAn, giaTien, linkAnh);
      maMonAn.focus();
      handleDisplayFood();
    });
  };
  const handleClickDeleteButton = () => {
    document.body.addEventListener("click", (e) => {
      if (e.target.matches("#deleteBtn")) {
        const currentId = e.target.getAttribute("data-id");
        const currentIndexFood = foodLists.findIndex(
          (item) => item.maMonAn === currentId
        );
        foodLists.splice(currentIndexFood, 1);
        setLocalStorage(BAI_TAP_1_LOCAL_STORAGE, foodLists);
        handleDisplayFood();
      }
    });
  };

  const handleDisplayFood = () => {
    let template = "";
    foodLists.forEach((food) => {
      const { maMonAn, tenMonAn, giaTien, linkAnh } = food;
      template += `<tr>
        <td>${maMonAn}</td>
        <td>${tenMonAn}</td>
        <td>${giaTien}</td>
        <td><img style="width: 100px;height:100px;" src=${linkAnh} /></td>
        <td><button class="btn btn-danger" id="deleteBtn" data-id=${maMonAn}>Xoá</button></td>
    </tr>`;
    });
    $(".tblDanhMucMonAn").innerHTML = template;
  };
  const app = () => {
    handleClickAddFoodButton();
    handleDisplayFood();
    handleClickDeleteButton();
  };
  app();
})();

const baiTap2 = (() => {
  const arrMonAn = [
    { maMonAn: 1, tenMonAn: "Nước lẩu haidilao", giaTien: 100 },
    { maMonAn: 2, tenMonAn: "Mì cay thành đô", giaTien: 200 },
    { maMonAn: 3, tenMonAn: "Mực bạch ngọc", giaTien: 300 },
  ];

  const hoaDon =
    JSON.parse(localStorage.getItem(BAI_TAP_2_LOCAL_STORAGE)) || [];

  const handleClickAddButton = () => {
    document.body.addEventListener("click", (e) => {
      if (e.target.matches("#add")) {
        const currentMonAn = arrMonAn.find(
          (item) => item.maMonAn === Number(e.target.getAttribute("data-set"))
        );
        const currentHoadon = hoaDon.find(
          (item) => item.maMonAn === currentMonAn.maMonAn
        );
        const newHoadon = new Food2();
        if (!currentHoadon) {
          for (let i in currentMonAn) {
            newHoadon[i] = currentMonAn[i];
          }
          hoaDon.push(newHoadon);
        } else {
          currentHoadon.soLuong += 1;
        }

        setLocalStorage(BAI_TAP_2_LOCAL_STORAGE, hoaDon);
        handleDisplayBill();
        handleTotalBill();
      }
    });
  };

  const handleClickDeleteButton = () => {
    document.body.addEventListener("click", (e) => {
      if (e.target.matches("#delete")) {
        const currentMonAn = arrMonAn.find(
          (item) => item.maMonAn === Number(e.target.getAttribute("data-set"))
        );
        const currentHoadon = hoaDon.find(
          (item) => item.maMonAn === currentMonAn.maMonAn
        );

        if (currentHoadon) {
          currentHoadon.soLuong -= 1;
          if (currentHoadon.soLuong < 1) {
            const index = hoaDon.findIndex(
              (item) => item.maMonAn === currentHoadon.maMonAn
            );
            hoaDon.splice(index, 1);
          }
        } else {
          showToastError("No Food On Bill!");
        }

        setLocalStorage(BAI_TAP_2_LOCAL_STORAGE, hoaDon);
        handleDisplayBill();
        handleTotalBill();
      }
    });
  };

  const handleTotalBill = () => {
    let totalBill = 0;
    hoaDon.forEach((item) => {
      let newItem = new Food2();
      newItem = { ...newItem, ...item };
      totalBill += newItem.total();
    });
    $("#txtThanhTien").nextElementSibling.innerHTML = totalBill;
  };

  const handleDisplayBill = () => {
    let template = ``;
    hoaDon.forEach((item) => {
      let newItem = new Food2();
      newItem = { ...newItem, ...item };

      template += `
      <tr>
          <td>${newItem.maMonAn}</td>
          <td>${newItem.tenMonAn}</td>
          <td>${newItem.soLuong}</td>
          <td>${newItem.total()}</td>
      </tr>`;
    });
    $(".baiTap2 #tblHoaDon").innerHTML = template;
  };

  const app = () => {
    handleClickAddButton();
    handleDisplayBill();
    handleClickDeleteButton();
    handleTotalBill();
  };
  app();
})();
