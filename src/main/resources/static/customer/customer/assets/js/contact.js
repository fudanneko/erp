(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================
    // ===============================查客戶資料===================================
    let customer = [];
    let customermap = new Map();
    let customermap2 = new Map();
    getcustomer();

    function getcustomer() {
        fetch("getAllCustomer")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    customer = data;
                    console.log("這是客戶", data);
                    for (let i = 0; i < customer.length; i++) {
                        let row = customer[i];
                        const customerId = row.customerId;
                        const customerName = row.customerName;
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

    // ============================查資料回來getAll() 拿到字串和筆數========================
    let dataaccount = 0;
    let contact = [];
    getAllContact();


    function getAllContact() {
        fetch("getAllContact")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    contact = data;
                    console.log('查到的聯絡人：', contact);
                    for (let i = 0; i < contact.length; i++) {
                        dataaccount = i;
                        let row = contact[i];

                        const contactId = row.contactId;
                        const customerId = row.customerId;
                        console.log(customerId);
                        const customerName = customermap.get(customerId);
                        console.log(customerName);
                        const contactName = row.contactName;
                        const contactTitle = row.contactTitle;
                        const contactMobile = row.contactMobile;

                        dataTable.row.add([contactId,
                            customerName,
                            contactName,
                            contactTitle,
                            contactMobile,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="-1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">客戶資料修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                     <div class="mb-3">
                            <label For="contactId${i}"
                                   class="col-form-label">編號:</label>
                           <input type="text" class="form-control" id="contactId${i}" value="${contactId}" readonly>
                        </div>
                    <div class="mb-3">
                            <label For="customerName${i}"
                                   class="col-form-label">客戶名稱:</label>
                            <select name="" id="customerName${i}" class="select24datatable" style="width: 200px"></select>
                        </div>
                        <div class="mb-3">
                            <label For="contactName${i}"
                                   class="col-form-label">聯絡人名稱:</label>
                            <input type="text" class="form-control" id="contactName${i}" value="${contactName}">
                        </div>
                        <div class="mb-3">
                            <label For="contactTitle${i}"
                                   class="col-form-label">聯絡人職稱:</label>
                           <input type="text" class="form-control" id="contactTitle${i}" value="${contactTitle}">
                        </div>
                         <div class="mb-3">
                            <label For="contactMobile${i}"
                                   class="col-form-label">手機:</label>
                            <input type="text" class="form-control" id="contactMobile${i}" value="${contactMobile}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <span id="msg"> </span>
                    <button type="button" class="btn btn-secondary editbutton"
                            data-bs-dismiss="modal" id="cancle${i}">取消
                    </button>
                    <button type="button" class="btn btn-primary" id="confirm${i}">確定</button>
                </div>
            </div>
        </div>
    </div>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton()
                    select4new();
                    selected4edit();
                    select4edit()
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
            // {
            //     targets: 0, // 第一列
            //     width: '20px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 1, // 第一列
            //     width: '20px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 2, // 第一列
            //     width: '100px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 5, // 第一列
            //     width: '75px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 6, // 第5列
            //     width: '250px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 7, // 第6列
            //     width: '50px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 8, // 第7列
            //     width: '50px' // 设置宽度，可以根据需要调整
            // },
            // {
            //     targets: 9, // 第8列
            //     width: '50px' // 设置宽度，可以根据需要调整
            // },
        ],
        dom: 'Qlfrtip',
    });

//

//     // ============================ 客戶代號及客戶名稱切換 ========================


//     // ============================ 修改資料進去 editOrder()========================
    function editContact(i) {
        const contactId=document.getElementById(`contactId${i}`).value;
        const customerName = document.getElementById(`customerName${i}`).value;
        const customerId = customermap2.get(customerName);
        const contactName = document.getElementById(`contactName${i}`).value;
        const contactTitle = document.getElementById(`contactTitle${i}`).value;
        const contactMobile = document.getElementById(`contactMobile${i}`).value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editContact', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                contactId:contactId,
                customerId: customerId,
                contactName: contactName,
                contactTitle: contactTitle,
                contactMobile: contactMobile,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '修改成功!',
                        showConfirmButton: false,
                        timer: 1500
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
                editContact(i);
            })
        }
    }

//     // ============================   newOrder()新增訂單========================
    function newContact() {
        const customerId = document.getElementById(`customerId4new`).value;
        const contactName = document.getElementById(`contactName4new`).value;
        const contactTitle = document.getElementById(`contactTitle4new`).value;
        const contactMobile = document.getElementById(`contactMobile4new`).value;

        // if (customerId4new === '') {
        //     msg4new.textContent = '客戶代號不可為空';
        //     return;
        // }
        fetch('newContact', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                customerId: customerId,
                contactName: contactName,
                contactTitle: contactTitle,
                contactMobile: contactMobile,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
                if (successful) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '新增成功!',
                        showConfirmButton: false,
                        timer: 1500
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
        newContact();
    })
//

    // ============================7. 找到所有刪除按鈕並加上事件========================

    function setdeletebutton() {
        for (let i = 0; i <= dataaccount; i++) {
            const contactId = contact[i].contactId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + contactId)
                deledtbyPK(contactId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(contactId) {
        const confirmed = confirm("確定要刪除嗎？");
        if (confirmed) {
            fetch('deleteContact', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(contactId),
            })
                .then(resp => resp.json())
                .then(body => {
                    if (body) {
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

//===================================================================

    const customerId4new = $('#customerId4new');

    function select4new() {
        //新增的select清空
        customerId4new.empty();
        //種類select動態放入
        customer.forEach(function (row) {
            const customerId = row.customerId;
            const customerName = row.customerName;
            const option = new Option(customerName, customerId);
            customerId4new.append(option)
        })
        customerId4new.select2();
    }

    //自動選好修改內的select
    function selected4edit() {
        for (let i = 0; i < contact.length; i++) {
            const customerNameselect = $(`#customerName${i}`);
            const customerName = customermap.get(contact[i].customerId);
            customerNameselect.val(customerName).trigger('change.select2');
        }
    }

    function select4edit() {
        //修改的select清空
        for (let i = 0; i < contact.length; i++) {
            const customerName = $('#customerName' + i);
            customerName.empty();
            //種類名稱select動態放入
            customer.forEach(function (row) {
                const customerId = row.customerId;
                const customerName2 = row.customerName;
                const option = new Option(customerName2, customerId);
                customerName.append(option);
            })
            customerName.select2();
        }
    }
    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================


    // ===============================^^^使用方法區^^^==============================


})();