(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // ============================0.查出客戶代號及客戶名稱 ========================
    getcustomerId();
    let customerData = [];
    let customerId4select2 = [];
    let customerName4select2 = [];
    let customermap = new Map();
    let customermap2 = new Map();

    function getcustomerId() {
        fetch("getAllCustomerDetail")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    customerData = data;
                    console.log("這是客戶", customerData);
                    for (let i = 0; i < customerData.length; i++) {
                        let row = customerData[i];
                        const customerId = row.customerId;
                        const customerName = row.customerName;
                        customerId4select2.push(customerId);
                        customerName4select2.push(customerName);
                        customermap.set(customerId, customerName);
                        customermap2.set(customerName, customerId);
                    }
                    ;
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ============================查資料回來getAllPromotion() 拿到字串和筆數========================
    let dataaccount = 0;
    console.log('aaaa');
    getAllOrder();
    let Order = []

    function getAllOrder() {
        fetch("getAllOrder")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    Order = data;
                    console.log('查到的訂單：', Order);

                    for (let i = 0; i < Order.length; i++) {
                        dataaccount = i;
                        let row = Order[i];

                        const OrderId = row.orderId;
                        const customerId = row.customerId;
                        const customerName = row.customerName;
                        const orderDate = dateformat(new Date(row.orderDate));
                        const deliveryDate = dateformat(new Date(row.deliveryDate));
                        const quotation = row.quotation;
                        const note = row.note;
                        const orderState = row.orderState;

                        dataTable.row.add([OrderId,
                            customerId,
                            customerName,
                            orderDate,
                            deliveryDate,
                            quotation,
                            note,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="-1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">訂單修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label For="recipientname${i}"
                                   class="col-form-label">訂單編號:</label>
                            <input type="text" class="form-control" id="OrderId${i}" value="${OrderId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="recipienttype${i}"
                                   class="col-form-label">客戶代號:</label>
                            <select name="" id="customerId${i}" class="select24datatable" style="width: 300px"> </select>
                        </div>
                        <div class="mb-3">
                            <label For="recipientmethed${i}"
                                   class="col-form-label">客戶名稱:</label>
                            <select name="" id="customerName${i}" class="select24datatable" style="width: 300px" > </select>
                        </div>
                        <div class="mb-3">
                            <label For="recipientcNo${i}"
                                   class="col-form-label">下訂日期:</label>
                            <input type="date" class="form-control" id="orderDate${i}" value="${orderDate}">
                        </div>
                        <div class="mb-3">
                            <label For="recipientaNo${i}"
                                   class="col-form-label">交貨日期:</label>
                           <input type="date" class="form-control" id="deliveryDate${i}" value="${deliveryDate}">
                        </div>
                         <div class="mb-3">
                            <label For="recipientaNo${i}"
                                   class="col-form-label">報價:</label>
                            <input type="text" class="form-control" id="quotation${i}" value="${quotation}">
                        </div>
                         <div class="mb-3">
                            <label For="recipientaNo${i}"
                                   class="col-form-label">備註:</label>
                           <textarea  class="form-control" id="note${i}" value="${note}"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <span id="msg"> </span>
                    <button type="button" class="btn btn-secondary editbutton"
                            data-bs-dismiss="modal" id="cancle${i}">取消
                    </button>
                    <button type="button" class="btn btn-primary" id="confirm${i}">修改</button>
                </div>
            </div>
        </div>
    </div>`,
                            `<a href="#"><button type="button" class="btn btn-outline-primary">詳情</button></a>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    customerIdName();
                    customerIdName4new();
                    seteditbutton();
                    // setinputinbox();
                    // addeventlistener4editbutton();
                    // setdeletebutton();
                    // addeventlistener4deletebutton();
                    // getAllCouponType();
                    // getAllPromotion();
                    // preview();
                    // const msg = document.querySelector('#msg');
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================  初始化datatable函式========================

    let dataTable = $('#all').DataTable({
        scrollY: '600px',
        scrollCollapse: true,
        paging: true,
        pageLength: 15,
        info: false,
        destroy: true,
        columnDefs: [
            {
                targets: 0, // 第一列
                width: '20px' // 设置宽度，可以根据需要调整
            },
            {
                targets: 1, // 第一列
                width: '20px' // 设置宽度，可以根据需要调整
            },
            {
                targets: 2, // 第一列
                width: '100px' // 设置宽度，可以根据需要调整
            },
            {
                targets: 5, // 第一列
                width: '75px' // 设置宽度，可以根据需要调整
            },
            {
                targets: 6, // 第5列
                width: '250px' // 设置宽度，可以根据需要调整
            },
            {
                targets: 7, // 第6列
                width: '50px' // 设置宽度，可以根据需要调整
            },
            {
                targets: 8, // 第7列
                width: '50px' // 设置宽度，可以根据需要调整
            },
            {
                targets: 9, // 第8列
                width: '50px' // 设置宽度，可以根据需要调整
            },
        ],
        dom: 'Qlfrtip',
    });

//

//     // ============================ 客戶代號及客戶名稱切換 ========================
    const customerId4new = $('#customerId4new');
    const customerName4new = $('#customerName4new');

    function customerIdName4new() {
        customerId4new.empty();
        customerName4new.empty();
        customermap.forEach((value, key) => {
            // 創建新的選項
            const option1 = new Option(key, key);
            const option2 = new Option(value, value);

            // 將選項添加到相關的<select>元素
            customerId4new.append(option1);
            customerName4new.append(option2);
        });
        // 重新初始化 Select2
        customerId4new.select2();
        customerName4new.select2();

        // 監聽選擇事件
        customerId4new.on('change', function () {
            const selectedValue = customerId4new.val();
            const changedvalue = customermap.get(selectedValue);
            customerName4new.val(changedvalue).trigger('change.select2');
        });

        customerName4new.on('change', function () {
            const selectedValue = customerName4new.val();
            const changedvalue = customermap2.get(selectedValue);
            customerId4new.val(changedvalue).trigger('change.select2');
        });

    }

    function customerIdName() {
        for (let i = 0; i <= dataaccount; i++) {
            const customerIdInput = $(`#customerId${i}`);
            const customerNameInput = $(`#customerName${i}`);
            // 先清空原有的選項
            customerIdInput.empty();
            customerNameInput.empty();

            customermap.forEach((value, key) => {
                // 創建新的選項
                const option1 = new Option(key, key);
                const option2 = new Option(value, value);
                // 將選項添加到相關的<select>元素
                customerIdInput.append(option1);
                customerNameInput.append(option2);
            });
            for (let i = 0; i < dataaccount; i++) {
                let row = Order[i];
                const customerId = row.customerId;
                const customerName = row.customerName;
                const customerIdInput = $(`#customerId${i}`);
                const customerNameInput = $(`#customerName${i}`);
                customerIdInput.val(customerId).trigger('change.select2');
                customerNameInput.val(customerName).trigger('change.select2');
            }
            // 重新初始化 Select2
            customerIdInput.select2();
            customerNameInput.select2();
            // 監聽選擇事件
            customerIdInput.on('change', function () {
                const selectedValue = customerIdInput.val();
                const changedvalue = customermap.get(selectedValue);
                customerNameInput.val(changedvalue).trigger('change.select2');
            });

            customerNameInput.on('change', function () {
                const selectedValue = customerNameInput.val();
                const changedvalue = customermap2.get(selectedValue);
                customerIdInput.val(changedvalue).trigger('change.select2');
            });


        }
    }

//     // ============================ 新增燈箱的日期預設 ========================

    // 获取今天的日期
    const today = new Date();

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

// 获取日期的年、月和日
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
    const day = String(today.getDate()).padStart(2, '0');

    const year2 = nextWeek.getFullYear();
    const month2 = String(nextWeek.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
    const day2 = String(nextWeek.getDate()).padStart(2, '0');

// 格式化成 YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    const formattedDate2 = `${year2}-${month2}-${day2}`;

// 设置日期输入字段的值为今天/下週
    const orderDate4new = $('#orderDate4new');
    const deliveryDate4new = $('#deliveryDate4new');

    orderDate4new.val(formattedDate);
    deliveryDate4new.val(formattedDate2);


//     // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const OrderId = document.getElementById(`OrderId${i}`).value;
        const customerId = document.getElementById(`customerId${i}`).value;
        const customerName = document.getElementById(`customerName${i}`).value;
        const orderDate = document.getElementById(`orderDate${i}`).value;
        const deliveryDate = document.getElementById(`deliveryDate${i}`).value;
        const quotation = document.getElementById(`quotation${i}`).value;
        const note = document.getElementById(`note${i}`).value;
        console.log("OrderId : " + OrderId)
        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editOrder', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: OrderId,
                customerId: customerId,
                customerName: customerName,
                orderDate: orderDate,
                deliveryDate: deliveryDate,
                quotation: quotation,
                note: note,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

//
    // ============================ 抓取所有修改的燈箱’修改‘按鈕 並綁定事件 ========================

    function seteditbutton() {
        for (let i = 0; i <= dataaccount; i++) {
            const editbuttons = document.getElementById('confirm' + i);
            editbuttons?.addEventListener('click', () => {
                console.log('修改按鈕啟動' + i)
                editOrder(i);
            })
        }
    }

//     // ============================   newOrder()新增訂單========================
    function newOrder() {
        const customerId4new = document.querySelector('#customerId4new').value;
        const customerName4new = document.querySelector('#customerName4new').value;
        const orderDate4new = document.querySelector('#orderDate4new').value;
        const deliveryDate4new = document.querySelector('#deliveryDate4new').value;
        const note4new = document.querySelector('#note4new').value;
        const msg4new = document.querySelector('#msg4new');

        if (customerId4new === '') {
            msg4new.textContent = '客戶代號不可為空';
            return;
        }
        if (customerName4new === '') {
            msg4new.textContent = '客戶名稱不可為空';
            return;
        }
        if (orderDate4new === '') {
            msg4new.textContent = '訂單日期不可為空';
            return;
        }
        if (deliveryDate4new === '') {
            msg4new.textContent = '交貨日期不可為空';
            return;
        }

        fetch('newOrder', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                customerId: customerId4new,
                customerName: customerName4new,
                orderDate: orderDate4new,
                deliveryDate: deliveryDate4new,
                note: note4new,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
                if (successful) {

                    Swal.fire({
                        position: 'center', icon: 'success', title: '新增成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: `${message}`, footer: '<a href=""></a>'
                    })
                }
                ;

            });

    };

    const newbutton = document.querySelector('#newbutton');
    newbutton.addEventListener('click', () => {
        newOrder();
    })
//

// ============================ 修改燈箱程式碼========================
//     const lightbox =
//         `<button type="button" class="btn btn-primary" class="btn btn-primary" data-bs-toggle="modal"
//                     data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
//          <div className="modal fade" id="exampleModal${i}" tabIndex="-1"
//          aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h1 className="modal-title fs-5" id="exampleModalLabel${i}">優惠活動種類修改
//                     </h1>
//                     <button type="button" className="btn-close" data-bs-dismiss="modal"
//                             aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//
//                     <form>
//                         <div className="mb-3">
//                             <label htmlFor="recipientname${i}"
//                                    className="col-form-label">訂單編號:</label>
//                             <input type="text" class="form-control" id="OrderId${i}" value="${OrderId}"readonly>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="recipienttype${i}"
//                                    className="col-form-label">客戶代號:</label>
//                             <select name="" id="customerId${i}" class="select24datatable" > </select>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="recipientmethed${i}"
//                                    className="col-form-label">客戶名稱:</label>
//                             <select name="" id="customerName${i}" class="select24datatable" > </select>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="recipientcNo${i}"
//                                    className="col-form-label">下訂日期:</label>
//                             <input type="date" class="form-control" id="orderDate${i}" value="${orderDate}">
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="recipientaNo${i}"
//                                    className="col-form-label">交貨日期:</label>
//                            <input type="date" class="form-control" id="deliveryDate${i}" value="${deliveryDate}">
//                         </div>
//                          <div className="mb-3">
//                             <label htmlFor="recipientaNo${i}"
//                                    className="col-form-label">報價:</label>
//                             <input type="text" class="form-control" id="quotation${i}" value="${quotation}">
//                         </div>
//                          <div className="mb-3">
//                             <label htmlFor="recipientaNo${i}"
//                                    className="col-form-label">備註:</label>
//                            <textarea  class="form-control" id="note${i}" value="${note}"></textarea>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="modal-footer">
//                     <span id="msg"> </span>
//                     <button type="button" className="btn btn-secondary editbutton"
//                             data-bs-dismiss="modal" id="cancle${i}">取消
//                     </button>
//                     <button type="button" className="btn btn-primary" id="confirm${i}">修改</button>
//                 </div>
//             </div>
//         </div>
//     </div>`

    // `<!--<a href="#"><button type="button" class="btn btn-outline-primary">詳情</button></a>-->`,
    // `<!--<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>-->`]);
//     // ============================7. 找到所有刪除按鈕========================
//     let deletebuttons = [];
//
//     function setdeletebutton() {
//         for (let i = 0; i <= dataaccount; i++) {
//             const deletebutton = document.getElementById('delete' + i);
//             deletebuttons.push(deletebutton);
//         }
//     }
//
//     // ============================8. 綁定所有刪除按鈕========================
//     function addeventlistener4deletebutton() {
//         for (let i = 0; i <= dataaccount; i++) {
//             deletebuttons[i]?.addEventListener('click', () => {
//                 const inputvalue = promotionCouponNoinputs[i].value;
//                 deledtbyPK(inputvalue);
//             })
//         }
//     }
//
//     // ============================9. 刪除方法========================
//     function deledtbyPK(promotionCouponNo) {
//         const confirmed = confirm("確定要刪除嗎？");
//         if (confirmed) {
//             fetch('deletePromotionCoupon', {
//                 method: 'POST', headers: {
//                     'Content-Type': 'application/json',
//                 }, body: JSON.stringify({
//                     promotionCouponNo: promotionCouponNo
//                 }),
//             })
//                 .then((resp) => {
//                     if (resp) {
//                         Swal.fire({
//                             position: 'center',
//                             icon: 'success',
//                             title: '刪除成功!',
//                             showConfirmButton: false,
//                             timer: 1500
//                         }).then(() => {
//                             location.reload()
//                         })
//                     } else {
//                         Swal.fire({
//                             icon: 'error', title: 'Oops...', text: '刪除失敗!', footer: '<a href=""></a>'
//                         })
//                     }
//                 })
//         }
//     };
//
//     // ============================10.查詢折價券種類========================
//     const select4CouponType = document.querySelector('#couponTypeNo');
//     const dynamicSpansCouponTypeNo = document.querySelector('#dynamicSpansCouponTypeNo');
//     let CouponTypelength = 0;
//     let x = 0;
//
//     function getAllCouponType() {
//         console.log('進入getAllCouponType()')
//         fetch("getAllCouponType")
//             .then(function (response) {
//                 // 檢查 API 响應的狀態碼
//                 if (response.status !== 200) {
//                     console.log('發生錯誤，狀態碼：' + response.status);
//                     return;
//                 }
//
//                 // 解析 JSON 格式的數據
//                 response.json().then(function (data) {
//                     // 在此處可以處理從 API 獲取的數據
//                     CouponType = data;
//                     console.log('獲取的折價券種類資訊：', CouponType);
//                     const lastData = CouponType[CouponType.length - 1];
//                     CouponTypelength = lastData.couponTypeNo;
//                     let str = ' <option selected disabled>請選擇折價券種類</option>';
//                     let str2 = '';
//                     let str3 = [];
//                     let str4 = [];
//                     let str3_0 = '';
//                     let str4_0 = '';
//                     for (let x = 0; x <= dataaccount; x++) {
//                         for (let u = 0; u < CouponType.length; u++) {
//                             let row = CouponType[u];
//                             const couponTypeNo2 = row.couponTypeNo;
//                             const couponTypeName = row.couponTypeName;
//                             let adminNod = "";
//                             if (row.adminNo !== null && row.adminNo !== "") {
//                                 adminNod = row.adminNo;
//                             }
//                             let counterNo = "";
//                             if (row.counterNo !== null) {
//                                 counterNo = row.counterNo;
//                             }
//                             // 處理日期格式
//                             const originalDate = new Date(row.couponCreateDate);
//                             const year = originalDate.getFullYear();
//                             const month = originalDate.getMonth() + 1; // 月份是從 0 開始計算，所以需要加 1
//                             const day = originalDate.getDate();
//                             const formattedDate = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
//                             // 處理日期格式
//                             const couponCreateDate = formattedDate;
//                             // 處理日期格式
//                             const originalDatea = new Date(row.couponExpireDate);
//                             const yeara = originalDatea.getFullYear();
//                             const montha = originalDatea.getMonth() + 1; // 月份是從 0 開始計算，所以需要加 1
//                             const daya = originalDatea.getDate();
//                             const formattedDatea = yeara + '-' + ('0' + montha).slice(-2) + '-' + ('0' + daya).slice(-2);
//                             // 處理日期格式
//                             const couponExpireDate = formattedDatea;
//
//                             const couponConditions = row.couponConditions;
//                             const couponPrice = row.couponPrice;
//                             const couponLowest = row.couponLowest;
//                             if (adminNod !== "") {
//                                 str4_0 += `<option value="${couponTypeNo2}" ${couponTypeNo2 === couponTypeNo4[x] ? 'selected' : ''}>${couponTypeNo2} : ${couponTypeName}</option>`
//                                 str3_0 += `<div id="span4CouponType${couponTypeNo2}${x}" class="hiddenyee">
//                                 <span>管理員編號： ${adminNod}</span>
//                                 <span>欄位編號: ${counterNo}</span>
//                                 <br>
//                                 <span>建立日期: ${couponCreateDate}</span>
//                                 <span>失效日期: ${couponExpireDate}</span>
//                                 <br>
//                                 <span>折扣金額: ${couponPrice}</span>
//                                 <span>使用門檻: ${couponLowest}</span>
//                                 <br>
//                                 <span>使用說明: ${couponConditions}</span>
//                                 </div>`
//                             }
//                         }
//                         str3.push(str3_0);
//                         str3_0 = '';
//                         str4.push(str4_0);
//                         str4_0 = '';
//                     }
//
//                     for (let i = 0; i < CouponType.length; i++) {
//                         let row = CouponType[i];
//                         const couponTypeNo2 = row.couponTypeNo;
//                         const couponTypeName = row.couponTypeName;
//                         let adminNod = "";
//                         if (row.adminNo !== null && row.adminNo !== "") {
//                             adminNod = row.adminNo;
//                         }
//                         let counterNo = "";
//                         if (row.counterNo != null) {
//                             counterNo = row.counterNo;
//                         }
//                         // 處理日期格式
//                         const originalDate = new Date(row.couponCreateDate);
//                         const year = originalDate.getFullYear();
//                         const month = originalDate.getMonth() + 1; // 月份是從 0 開始計算，所以需要加 1
//                         const day = originalDate.getDate();
//                         const formattedDate = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
//                         // 處理日期格式
//                         const couponCreateDate = formattedDate;
//                         // 處理日期格式
//                         const originalDatea = new Date(row.couponExpireDate);
//                         const yeara = originalDatea.getFullYear();
//                         const montha = originalDatea.getMonth() + 1; // 月份是從 0 開始計算，所以需要加 1
//                         const daya = originalDatea.getDate();
//                         const formattedDatea = yeara + '-' + ('0' + montha).slice(-2) + '-' + ('0' + daya).slice(-2);
//                         // 處理日期格式
//                         const couponExpireDate = formattedDatea;
//
//                         const couponConditions = row.couponConditions;
//                         const couponPrice = row.couponPrice;
//                         const couponLowest = row.couponLowest;
//                         if (adminNod !== "") {
//                             str += `<option value="${couponTypeNo2}" >${couponTypeNo2} : ${couponTypeName}</option>`
//                             str2 += `<div id="span4CouponTypee${couponTypeNo2}" class="hiddenyee">
//                                 <span>管理員編號： ${adminNod}</span>
//                                 <span>欄位編號: ${counterNo}</span>
//                                 <br>
//                                 <span>建立日期: ${couponCreateDate}</span>
//                                 <span>失效日期: ${couponExpireDate}</span>
//                                 <br>
//                                 <span>折扣金額: ${couponPrice}</span>
//                                 <span>使用門檻: ${couponLowest}</span>
//                                 <br>
//                                 <span>使用說明: ${couponConditions}</span>
//                                 </div>`
//                         }
//
//                     }
//                     dynamicSpansCouponTypeNo.innerHTML = str2;
//                     select4CouponType.innerHTML = str;
//                     for (let i = 0; i <= dataaccount; i++) {
//                         if (typeof dynamicSpanscouponTypeNoinputs[i] !== 'undefined') {
//                             dynamicSpanscouponTypeNoinputs[i].innerHTML = str3[i];
//                         }
//                         if (typeof couponTypeNoinputs[i] !== 'undefined') {
//                             couponTypeNoinputs[i].innerHTML = str4[i];
//                         }
//                     }
//                     setdiv4CouponType();
//                     Listener4SelectCoupontype()
//                     setdiv4div4CouponType2()
//
//
//                 });
//             })
//             .catch(function (err) {
//                 console.log('錯誤：', err);
//             });
//     }
//
//     // ============================11.抓到選項下div並綁定select========================
//     let div4CouponType = [];
//
//     function setdiv4CouponType() {
//         for (let i = 0; i <= CouponTypelength; i++) {
//             const div4CouponTypea = document.getElementById('span4CouponTypee' + i);
//             if (div4CouponTypea) {
//                 div4CouponType.push(div4CouponTypea);
//             }
//         }
//     }
//
//     let div4CouponType2 = [];
//     let div4CouponType3 = []
//
//     function setdiv4div4CouponType2() {//ok
//         for (let p = 0; p <= dataaccount; p++) {
//             for (let i = 0; i <= CouponTypelength; i++) {
//                 const div4CouponTypea = document.getElementById('span4CouponType' + i + p);
//                 if (div4CouponTypea) {
//                     div4CouponType2.push(div4CouponTypea);
//                 }
//             }
//             div4CouponType3.push(div4CouponType2);
//             div4CouponType2 = [];
//         }
//     }
//
//     function Listener4SelectCoupontype() {
//         for (let i = 0; i <= dataaccount; i++) {
//             couponTypeNoinputs[i]?.addEventListener('change', () => {
//                 const selectedValue2 = couponTypeNoinputs[i].value;
//                 div4CouponType3[i].forEach(function (div) {
//                     if (div.id === "span4CouponType" + selectedValue2 + i) {
//                         div.classList.remove("hiddenyee");
//                     } else {
//                         div.classList.add("hiddenyee");
//                     }
//                 });
//
//             })
//         }
//         select4CouponType?.addEventListener('change', () => {
//             const selectedValue = select4CouponType.value;
//             div4CouponType.forEach(function (div) {
//                 if (div.id === "span4CouponTypee" + selectedValue) {
//                     div.classList.remove("hiddenyee");
//                 } else {
//                     div.classList.add("hiddenyee");
//                 }
//             });
//         })
//     };
//
//     // ============================12.查詢活動種類========================
//     const select4promotionName = document.querySelector('#promotionName');
//     const dynamicSpanPromotionName = document.querySelector('#dynamicSpanPromotionName');
//     let promotionNamelength = 0;
//     let promotionname = [];
//
//     function getAllPromotion() {
//         console.log('進入getAllPromotion()')
//         fetch("getAllPromotion")
//             .then(function (response) {
//                 // 檢查 API 响應的狀態碼
//                 if (response.status !== 200) {
//                     console.log('發生錯誤，狀態碼：' + response.status);
//                     return;
//                 }
//
//                 // 解析 JSON 格式的數據
//                 response.json().then(function (data) {
//                     // 在此處可以處理從 API 獲取的數據
//                     PromotionType = data;
//                     console.log('獲取的促銷活動數據：', PromotionType);
//                     promotionNamelength = PromotionType.length;
//                     let str = ' <option selected disabled>請選擇活動種類</option>';
//                     let str2 = '';
//                     let str3_0 = '';
//                     let str4_0 = '';
//                     let str3 = [];
//                     let str4 = [];
//
//
//                     for (let h = 0; h <= dataaccount; h++) {
//                         for (let u = 0; u < promotionNamelength; u++) {
//                             let row = PromotionType[u];
//                             const promotionName2 = row.promotionName;
//                             promotionname.push(promotionName2);
//                             const promotionType = row.promotionType;
//                             const promotionMethod = row.promotionMethod;
//                             let adminNo = "";
//                             if (row.adminNo !== null && row.adminNo !== "") {
//                                 adminNo = row.adminNo;
//                             }
//                             let counterNo = '';
//                             if (row.counterNo !== null) {
//                                 counterNo = row.counterNo
//                             }
//                             if (adminNo !== "") {
//                                 str4_0 += `<option value="${promotionName2}" ${promotionName2 === promotionName4[h] ? 'selected' : ''}>${promotionName2}</option>`
//                                 str3_0 += `<div id="span4Promotion${promotionName2}${h}" class="hiddenyee">
//                                 <span>管理員編號： ${adminNo}</span>
//                                 <span>欄位編號: ${counterNo}</span>
//                                 <br>
//                                 <span>發放種類: ${promotionType}</span>
//                                 <span>發放方式: ${promotionMethod}</span>
//                                 </div>`
//                             }
//                         }
//                         str3.push(str3_0);
//                         str3_0 = '';
//                         str4.push(str4_0);
//                         str4_0 = '';
//                     }
//                     for (let i = 0; i < promotionNamelength; i++) {
//                         let row = PromotionType[i];
//                         const promotionName2 = row.promotionName;
//                         promotionname.push(promotionName);
//                         const promotionType = row.promotionType;
//                         const promotionMethod = row.promotionMethod;
//
//                         let adminNo = '';
//                         if (row.adminNo !== null && row.adminNo !== "") {
//                             adminNo = row.adminNo;
//                         }
//                         let counterNo = '';
//                         if (row.counterNo != null) {
//                             counterNo = row.counterNo
//                         }
//                         if (adminNo !== "") {
//                             str += `<option value="${promotionName2}" >${promotionName2}</option>`
//                             str2 += `<div id="span4Promotion${promotionName2}" class="hiddenyee">
//                                 <span>管理員編號： ${adminNo}</span>
//                                 <span>欄位編號: ${counterNo}</span>
//                                 <br>
//                                 <span>發放種類: ${promotionType}</span>
//                                 <span>發放方式: ${promotionMethod}</span>
//                                 </div>`
//                         }
//                     }
//                     dynamicSpanPromotionName.innerHTML = str2;
//                     select4promotionName.innerHTML = str;
//                     for (let i = 0; i <= dataaccount; i++) {
//                         if (typeof dynamicSpanspromotionNameinputs[i] !== 'undefined') {
//                             dynamicSpanspromotionNameinputs[i].innerHTML = str3[i];
//                         }
//                         if (typeof promotionNameinputs[i] !== 'undefined') {
//                             promotionNameinputs[i].innerHTML = str4[i];
//                         }
//                     }
//                     setdiv4Promotion();
//                     setdiv4Promotion2()
//                     Listener4SelectPromotion();
//
//                 });
//             })
//             .catch(function (err) {
//                 console.log('錯誤：', err);
//             });
//     }
//
//     // ============================11.抓到選項下div並綁定select========================
//     let div4Promotion = [];
//
//     function setdiv4Promotion() {
//         for (let i = 0; i < promotionNamelength; i++) {
//             const div4Promotiona = document.getElementById('span4Promotion' + promotionname[i]);
//             if (div4Promotiona) {
//                 div4Promotion.push(div4Promotiona);
//             }
//         }
//     }
//
//     let div4Promotion2 = [];
//     let div4promotion3 = []
//
//     function setdiv4Promotion2() {
//         for (let p = 0; p <= dataaccount; p++) {
//             for (let i = 0; i < promotionNamelength; i++) {
//                 const div4Promotiona = document.getElementById('span4Promotion' + promotionname[i] + p);
//                 if (div4Promotiona) {
//                     div4Promotion2.push(div4Promotiona);
//                 }
//             }
//             div4promotion3.push(div4Promotion2);
//             div4Promotion2 = [];
//         }
//     }
//
//
//     function Listener4SelectPromotion() {
//         for (let i = 0; i <= dataaccount; i++) {
//             promotionNameinputs[i]?.addEventListener('change', () => {
//                 const selectedValue = promotionNameinputs[i].value;
//                 div4promotion3[i].forEach(function (div) {
//
//                     if (div.id === "span4Promotion" + selectedValue + i) {
//                         div.classList.remove("hiddenyee");
//                     } else {
//                         div.classList.add("hiddenyee");
//                     }
//                 });
//             })
//         }
//         select4promotionName?.addEventListener('change', () => {
//             const selectedValue = select4promotionName.value;
//             div4Promotion.forEach(function (div) {
//                 if (div.id === "span4Promotion" + selectedValue) {
//                     div.classList.remove("hiddenyee");
//                 } else {
//                     div.classList.add("hiddenyee");
//                 }
//             });
//         })
//     };
//
// // ============================12. 圖片讀取，轉型成base64 readPic()========================
//     let base64Image = '';
//
//     function readPic(event) {
//         const file = event.target.files[0]; // 獲取選擇的檔案
//         if (file) {
//             const reader = new FileReader(); //讀取
//             reader.onload = function (e) {
//                 const imageSrc = e.target.result; // 獲取數據
//                 base64Image = imageSrc.split(",")[1];// 轉成base64
//                 console.log()
//             };
//             reader.readAsDataURL(file); // 讀取成url
//             // return base64Image;
//         }
//     }
//
//
//     // ===============================13預覽圖====================================
//     const avatarUploads = [];
//     const avatarPreviews = [];
//
//     function preview() {
//
//
//         for (let i = 0; i <= dataaccount; i++) {
//             const avatarUploada = document.getElementById("promotionPic" + i);
//             const avatarPreviewa = document.getElementById("avatar-preview" + i);
//             avatarUploads.push(avatarUploada);
//             avatarPreviews.push(avatarPreviewa);
//
//         }
//
//         for (let i = 0; i <= dataaccount; i++) {
//             avatarPreviews[i].src = `/Jamigo/promotion/promotion4pic/${promotionCouponNos[i]}`
//             avatarUploads[i]?.addEventListener("change", function () {
//                 const file = avatarUploads[i].files[0];
//                 const reader = new FileReader();
//
//                 reader.onload = function (e) {
//                     avatarPreviews[i].src = e.target.result;
//                 };
//
//                 if (file) {
//                     reader.readAsDataURL(file);
//                 } else {
//                     avatarPreviews[i].src = "#";
//                 }
//             });
//         }
//     }

    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================

    //=================================1. 總之先查一次=================================


    // ===============================2. 確認新增按鈕================================

    // const button4new = document.querySelector('#newbutton');
    // button4new?.addEventListener('click', () => {
    //     newAPromotion();
    // })
//=================================3. 圖片檔案上傳按鈕=============================


    // ===============================^^^使用方法區^^^==============================

})();