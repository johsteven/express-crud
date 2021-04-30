const formDelete = document.querySelectorAll(".formDelete");

formDelete.forEach(item => item.addEventListener("click", swalDelete))

function swalDelete() {
    const form = this;
    event.preventDefault();
    swal({
            title: "Apakah anda yakin",
            text: "Data ini akan dihapus?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Data berhasil dihapus!", {
                    icon: "success",
                }).then(() => form.submit());
            }
        });
}