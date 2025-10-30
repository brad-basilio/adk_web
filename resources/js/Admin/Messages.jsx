import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "@Utils/CreateReactScript";
import Table from "../Components/Table";
import DxButton from "../Components/dx/DxButton";
import ReactAppend from "@Utils/ReactAppend";
import MessagesRest from "@Rest/Admin/MessagesRest";
import Modal from "@Adminto/Modal";
import Swal from "sweetalert2";

const messagesRest = new MessagesRest();

const Messages = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    const [dataLoaded, setDataLoaded] = useState(null);

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete Message",
            text: "Are you sure you want to delete this message?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });
        if (!isConfirmed) return;
        const result = await messagesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onModalOpen = (data) => {
        if (!data.seen) {
            messagesRest.boolean({
                id: data,
                field: "seen",
                value: true,
            });
            $(gridRef.current).dxDataGrid("instance").refresh();
        }
        setDataLoaded(data);
        $(modalRef.current).modal("show");
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Messages"
                rest={messagesRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refresh table",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "name",
                        caption: "Name",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <span
                                    style={{
                                        width: "100%",
                                        fontWeight: data.seen
                                            ? "lighter"
                                            : "bold",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => onModalOpen(data)}
                                >
                                    {data.name}
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "email",
                        caption: "Email",
                    },
                    {
                        dataField: "phone",
                        caption: "Phone",
                    },
                    {
                        dataField: "subject",
                        caption: "Subject",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <span>
                                    {data.subject || 
                                        <i className="text-muted">- No subject -</i>
                                    }
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "created_at",
                        caption: "Date",
                        dataType: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        sortOrder: "desc",
                    },
                    {
                        dataField: "status",
                        caption: "Status",
                        dataType: "boolean",
                        cellTemplate: (container, { data }) => {
                            if (data.seen) {
                                ReactAppend(
                                    container,
                                    <span className="badge bg-success rounded-pill">
                                        Read
                                    </span>
                                );
                            } else {
                                ReactAppend(
                                    container,
                                    <span className="badge bg-danger rounded-pill">
                                        Unread
                                    </span>
                                );
                            }
                        },
                    },
                    {
                        caption: "Actions",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-dark",
                                    title: "View message",
                                    icon: "fa fa-eye",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            // container.append(DxButton({
                            //   className: 'btn btn-xs btn-light',
                            //   title: data.status === null ? 'Restaurar' : 'Cambiar estado',
                            //   icon: data.status === 1 ? 'fa fa-toggle-on text-success' : data.status === 0 ? 'fa fa-toggle-off text-danger' : 'fas fa-trash-restore',
                            //   onClick: () => onStatusChange(data)
                            // }))
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Delete",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                })
                            );
                        },
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}
            />
            <Modal modalRef={modalRef} title="Message" hideFooter>
                <p>
                    <b>Name</b>:
                    <span className="ms-1">{dataLoaded?.name}</span>
                </p>
                <p>
                    <b>Email</b>:
                    <span className="ms-1">
                        {dataLoaded?.email || (
                            <i className="text-muted">- No email -</i>
                        )}
                    </span>
                </p>
                <p>
                    <b>Phone</b>:
                    <span className="ms-1">{dataLoaded?.phone}</span>
                </p>
                <p>
                    <b>Subject</b>:
                    <span className="ms-1">
                        {dataLoaded?.subject || (
                            <i className="text-muted">- No subject -</i>
                        )}
                    </span>
                </p>
                <p>
                    <b>Message</b>:
                    <span className="ms-1">{dataLoaded?.description}</span>
                </p>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Messages">
            <Messages {...properties} />
        </BaseAdminto>
    );
});
