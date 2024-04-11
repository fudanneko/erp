(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // ============================查資料回來getAllPromotion() 拿到字串和筆數========================
    let dataaccount = 0;
    let customer = []
    getAllCustomer();


    function getAllCustomer() {
        fetch("getAllCustomer")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    customer = data;
                    console.log('查到的訂單：', customer);

                    for (let i = 0; i < customer.length; i++) {
                        dataaccount = i;
                        let row = customer[i];

                        const customerId = row.customerId;
                        const customeruk=row.customeruk;
                        const customerName = row.customerName;
                        const customerPhone = row.customerPhone;
                        const customerFax = row.customerFax;
                        const customerAddress = row.customerAddress;
                        const customerMultiplier = row.customerMultiplier;
                        const note = row.note;

                        dataTable.row.add([customeruk,
                            customerName,
                            customerPhone,
                            customerFax,
                            customerAddress,
                            customerMultiplier,
                            note,
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
                            <label For="customerId${i}"
                                   class="col-form-label">編號:</label>
                            <input type="text" class="form-control" id="customerId${i}" value="${customerId}" readonly>
                        </div>
                    <div class="mb-3">
                            <label For="customeruk${i}"
                                   class="col-form-label">客戶代號:</label>
                            <input type="text" class="form-control" id="customeruk${i}" value="${customeruk}" >
                        </div>
                        <div class="mb-3">
                            <label For="customerName${i}"
                                   class="col-form-label">客戶名稱:</label>
                            <input type="text" class="form-control" id="customerName${i}" value="${customerName}" >
                        </div>
                        <div class="mb-3">
                            <label For="customerPhone${i}"
                                   class="col-form-label">電話:</label>
                            <input type="text" class="form-control" id="customerPhone${i}" value="${customerPhone}">
                        </div>
                        <div class="mb-3">
                            <label For="customerFax${i}"
                                   class="col-form-label">傳真:</label>
                           <input type="text" class="form-control" id="customerFax${i}" value="${customerFax}">
                        </div>
                         <div class="mb-3">
                            <label For="customerAddress${i}"
                                   class="col-form-label">地址:</label>
                            <input type="text" class="form-control" id="customerAddress${i}" value="${customerAddress}">
                        </div>
                        <div class="mb-3">
                            <label For="customerMultiplier${i}"
                                   class="col-form-label">倍率:</label>
                            <input type="text" class="form-control" id="customerMultiplier${i}" value="${customerMultiplier}">
                        </div>
                         <div class="mb-3">
                            <label For="note${i}"
                                   class="col-form-label">備註:</label>
                           <textarea  class="form-control" id="note${i}" >${note}</textarea>
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
                            `<button type="button" class="btn btn-outline-primary" id="contact${i}">聯絡人</button>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    setcontactbutton();
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
    function editCustomer(i) {
        const customerId = document.getElementById(`customerId${i}`).value;
        const customeruk = document.getElementById(`customeruk${i}`).value;
        const customerName = document.getElementById(`customerName${i}`).value;
        const customerPhone = document.getElementById(`customerPhone${i}`).value;
        const customerFax = document.getElementById(`customerFax${i}`).value;
        const customerAddress = document.getElementById(`customerAddress${i}`).value;
        const customerMultiplier = document.getElementById(`customerMultiplier${i}`).value;
        const note = document.getElementById(`note${i}`).value;
        console.log(note) ;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editCustomer', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                customerId: customerId,
                customeruk:customeruk,
                customerName: customerName,
                customerPhone: customerPhone,
                customerFax: customerFax,
                customerAddress: customerAddress,
                customerMultiplier: customerMultiplier,
                note: note,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful,message} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: `${message}`, footer: '<a href=""></a>'
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
                editCustomer(i);
            })
        }
    }

//     // ============================   newOrder()新增訂單========================
    function newCustomer() {
        const customeruk = document.getElementById(`customeruk4new`).value;
        const customerName = document.getElementById(`customerName4new`).value;
        const customerPhone = document.getElementById(`customerPhone4new`).value;
        const customerFax = document.getElementById(`customerFax4new`).value;
        const customerAddress = document.getElementById(`customerAddress4new`).value;
        const customerMultiplier = document.getElementById(`customerMultiplier4new`).value;
        const note = document.getElementById(`note4new`).value;

        // if (customerId4new === '') {
        //     msg4new.textContent = '客戶代號不可為空';
        //     return;
        // }
        fetch('newCustomer', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                customeruk: customeruk,
                customerName: customerName,
                customerPhone: customerPhone,
                customerFax: customerFax,
                customerAddress: customerAddress,
                customerMultiplier: customerMultiplier,
                note: note,
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
        newCustomer();
    })
//

    // ============================7. 找到所有刪除按鈕並加上事件========================

    function setdeletebutton() {
        for (let i = 0; i <= dataaccount; i++) {
            const customerId = customer[i].customerId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + customerId)
                deledtbyPK(customerId);
            })
        }
    }

    function setcontactbutton() {
        for (let i = 0; i <= dataaccount; i++) {
            const contactbutton = document.getElementById('contact' + i);
            contactbutton?.addEventListener('click', () => {
                sessionStorage.setItem('customer', JSON.stringify(customer[i]));
                window.open('contact4new.html', '_blank');
            })
        }
    }


    // ============================9. 刪除方法========================
    function deledtbyPK(customerId) {
        const confirmed = confirm("確定要刪除嗎？");
        if (confirmed) {
            fetch('deleteCustomer', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(customerId),
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

//

    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================



    // ===============================^^^使用方法區^^^==============================

})();