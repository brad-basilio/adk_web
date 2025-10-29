import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "@Utils/CreateReactScript";
import Table from "../Components/Table";
import DxButton from "../Components/dx/DxButton";
import ReactAppend from "@Utils/ReactAppend";
import AppRequestsRest from "@Rest/Admin/AppRequestsRest";
import Modal from "@Adminto/Modal";
import Swal from "sweetalert2";

const appRequestsRest = new AppRequestsRest();

const AppRequests = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    const [dataLoaded, setDataLoaded] = useState(null);

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete Request",
            text: "Are you sure you want to delete this app request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });
        if (!isConfirmed) return;
        const result = await appRequestsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onModalOpen = (data) => {
        if (!data.seen) {
            appRequestsRest.boolean({
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
                title="ADK Assist App Requests"
                rest={appRequestsRest}
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
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <span>
                                    {data.phone || 
                                        <i className="text-muted">- No phone -</i>
                                    }
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "company",
                        caption: "Company",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <span>
                                    {data.company || 
                                        <i className="text-muted">- No company -</i>
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
                        dataField: "seen",
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
                                    title: "View request",
                                    icon: "fa fa-eye",
                                    onClick: () => onModalOpen(data),
                                })
                            );
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
            <Modal modalRef={modalRef} title="App Request Details" hideFooter>
                <div style={{ fontSize: '15px' }}>
                    <p>
                        <b>Name</b>:
                        <span className="ms-1">{dataLoaded?.name}</span>
                    </p>
                    <p>
                        <b>Email</b>:
                        <span className="ms-1">
                            <a href={`mailto:${dataLoaded?.email}`}>{dataLoaded?.email}</a>
                        </span>
                    </p>
                    {dataLoaded?.phone && (
                        <p>
                            <b>Phone</b>:
                            <span className="ms-1">
                                <a href={`tel:${dataLoaded?.phone}`}>{dataLoaded?.phone}</a>
                            </span>
                        </p>
                    )}
                    {dataLoaded?.company && (
                        <p>
                            <b>Company</b>:
                            <span className="ms-1">{dataLoaded?.company}</span>
                        </p>
                    )}
                    {dataLoaded?.message && (
                        <p>
                            <b>Message</b>:
                            <span className="ms-1" style={{ display: 'block', marginTop: '8px', whiteSpace: 'pre-wrap' }}>
                                {dataLoaded?.message}
                            </span>
                        </p>
                    )}
                    <p>
                        <b>Request Date</b>:
                        <span className="ms-1">
                            {dataLoaded?.created_at ? new Date(dataLoaded.created_at).toLocaleString() : ''}
                        </span>
                    </p>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="App Requests">
            <AppRequests {...properties} />
        </BaseAdminto>
    );
});
