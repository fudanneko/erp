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
                        const customeruk = row.customeruk;
                        const customerName = row.customerName;
                        customerId4select2.push(customeruk);
                        customerName4select2.push(customerName);
                        customermap.set(customeruk, customerName);
                        customermap2.set(customerName, customeruk);
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
    getAllOrder();
    let Order = []

    function getAllOrder() {
        fetch("getAllOrderbystate")
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
                    dataaccount = Order.length;
                    for (let i = 0; i < Order.length; i++) {
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
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
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
                            <label For="OrderId${i}"
                                   class="col-form-label">訂單編號:</label>
                            <input type="text" class="form-control" id="OrderId${i}" value="${OrderId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="customerId${i}"
                                   class="col-form-label">客戶代號:</label>
                            <select name="" id="customerId${i}" class="select24datatable" style="width: 300px"> </select>
                        </div>
                        <div class="mb-3">
                            <label For="customerName${i}"
                                   class="col-form-label">客戶名稱:</label>
                            <select name="" id="customerName${i}" class="select24datatable" style="width: 300px" > </select>
                        </div>
                        <div class="mb-3">
                            <label For="orderDate${i}"
                                   class="col-form-label">下訂日期:</label>
                            <input type="date" class="form-control" id="orderDate${i}" value="${orderDate}">
                        </div>
                        <div class="mb-3">
                            <label For="deliveryDate${i}"
                                   class="col-form-label">交貨日期:</label>
                           <input type="date" class="form-control" id="deliveryDate${i}" value="${deliveryDate}">
                        </div>
                         <div class="mb-3">
                            <label For="quotation${i}"
                                   class="col-form-label">報價:</label>
                            <input type="text" class="form-control" id="quotation${i}" value="${quotation}">
                        </div>
                         <div class="mb-3">
                            <label For="note${i}"
                                   class="col-form-label">備註:</label>
                           <textarea  class="form-control" id="note${i}" value="${note}"></textarea>
                        </div>
                         <div class="mb-3">
                            <label For="orderState${i}"
                                   class="col-form-label">已完成:</label>
                           <input type="checkbox"  id="orderState${i}" ${orderState === 1 ? 'checked' : ''}">
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
                            `<a href="orderdetailslist4new.html"><button type="button" class="btn btn-outline-primary" id="detail${i}">詳情</button></a>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    customerIdName();
                    customerIdName4new();
                    seteditbutton();
                    setdeletebutton();
                    detailbutton();
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
        // dom: 'Qlfrtip',
    });

//

//     // ============================ 客戶代號及客戶名稱切換 ========================
    const customerId4new = $('#customerId4new');
    const customerName4new = $('#customerName4new');

    function customerIdName4new() {
        customerId4new.select2();
        customerName4new.select2();
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
        for (let i = 0; i < dataaccount; i++) {
            const customerIdInput = $(`#customerId${i}`);
            const customerNameInput = $(`#customerName${i}`);
            customerIdInput.select2();
            customerNameInput.select2();
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
        const orderState = document.getElementById(`orderState${i}`).checked ? 1 : 0;

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
                orderState: orderState,
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
        for (let i = 0; i < dataaccount; i++) {
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
        const orderStateValue = 0;
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
                orderState: orderStateValue,
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

//
    // ============================7. 找到所有刪除按鈕並加上事件========================

    function setdeletebutton() {
        for (let i = 0; i < dataaccount; i++) {
            const orderId = Order[i].orderId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + orderId)
                deledtbyPK(orderId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(orderId) {
        const confirmed = confirm("確定要刪除嗎？");
        console.log(orderId)
        if (confirmed) {
            fetch('deleteOrder', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(orderId),
            })
                .then((resp) => {
                    if (resp) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '刪除成功!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error', title: 'Oops...', text: '刪除失敗!', footer: '<a href=""></a>'
                        })
                    }
                })
        }
    };

    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================詳情按鈕 資料寫入storage===================================

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================

    //=================================1. 總之先查一次=================================
    function detailbutton() {
        for (let i = 0; i < dataaccount; i++) {
            const detailbutton = document.getElementById('detail' + i);
            detailbutton?.addEventListener('click', () => {
                sessionStorage.setItem('order',JSON.stringify(Order[i]));
            })
        }
    }

    // ===============================2. 確認新增按鈕================================


//=================================3. 圖片檔案上傳按鈕=============================


    // ===============================^^^使用方法區^^^==============================

})();