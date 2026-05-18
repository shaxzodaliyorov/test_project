import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Empty,
  Input,
  Pagination,
  Space,
  Table,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import type { User } from "@/types/user";
import { DataTableSkeleton } from "@/components/skeletons/data-table-skeleton";
import { ListCardSkeletonList } from "@/components/skeletons/list-card-skeleton-list";
import { useAdminUsersPage } from "@/hooks/use-admin-users-page";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { AdminUserCard } from "./admin-user-card";
import { AdminUserCreateModal } from "./admin-user-create-modal";
import { AdminUserEditDrawer } from "./admin-user-edit-drawer";
import {
  usersCardList,
  usersFullWidth,
  usersInputPrefix,
  usersPageStack,
  usersPageStackCompact,
  usersPaginationCompact,
  usersSearchDesktop,
  usersTitle,
  usersTitleCompact,
  usersToolbarColumn,
  usersToolbarRowBetween,
} from "./admin-users-page.styles";

export function AdminUsersPage() {
  const { t } = useTranslation(["users", "common"]);
  const isCompact = useCompactLayout();
  const u = useAdminUsersPage();
  const isFetching = u.listQuery.isFetching;
  const columnCount = u.columns?.length ?? 6;

  return (
    <>
      <div style={isCompact ? usersPageStackCompact : usersPageStack}>
        {isCompact ? (
          <>
            <Typography.Title level={4} style={usersTitleCompact}>
              {t("users:title")}
            </Typography.Title>
            <div style={usersToolbarColumn}>
              <Input
                allowClear
                placeholder={t("users:searchPlaceholder")}
                prefix={<SearchOutlined style={usersInputPrefix} />}
                value={u.searchInput}
                onChange={(e) => u.setSearchInput(e.target.value)}
                style={usersFullWidth}
              />
              {u.canWrite ? (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={u.openCreate}
                  block
                >
                  {t("users:addUser")}
                </Button>
              ) : null}
            </div>
          </>
        ) : (
          <div style={usersToolbarRowBetween}>
            <Typography.Title level={2} style={usersTitle}>
              {t("users:title")}
            </Typography.Title>
            <Space wrap>
              <Input
                allowClear
                placeholder={t("users:searchPlaceholder")}
                prefix={<SearchOutlined style={usersInputPrefix} />}
                value={u.searchInput}
                onChange={(e) => u.setSearchInput(e.target.value)}
                style={usersSearchDesktop}
              />
              {u.canWrite ? (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={u.openCreate}
                >
                  {t("users:addUser")}
                </Button>
              ) : null}
            </Space>
          </div>
        )}

        {u.listQuery.isError ? (
          <Alert
            type="error"
            showIcon
            message={t("users:loadError")}
            description={u.errorDescription}
            action={
              <Button size="small" onClick={() => void u.listQuery.refetch()}>
                {t("common:retry")}
              </Button>
            }
          />
        ) : null}

        {isCompact ? (
          isFetching ? (
            <ListCardSkeletonList
              count={u.paginationConfig.pageSize}
              variant="admin-user"
            />
          ) : u.data.length === 0 ? (
            u.listQuery.isError ? null : (
              <Empty description={u.emptyDescription} />
            )
          ) : (
            <>
              <div style={usersCardList}>
                {u.data.map((row, index) => (
                  <AdminUserCard
                    key={row.id}
                    user={row}
                    index={
                      (u.paginationConfig.current - 1) *
                        u.paginationConfig.pageSize +
                      index +
                      1
                    }
                    canWrite={u.canWrite}
                    isSelf={row.id === u.currentUserId}
                    onEdit={() => u.openEdit(row)}
                    onDelete={() => u.confirmDelete(row)}
                    t={t}
                  />
                ))}
              </div>
              {u.total > 0 ? (
                <Pagination
                  {...u.paginationConfig}
                  size="small"
                  style={usersPaginationCompact}
                />
              ) : null}
            </>
          )
        ) : isFetching ? (
          <DataTableSkeleton
            columnCount={columnCount}
            rowCount={u.paginationConfig.pageSize}
          />
        ) : (
          <Table<User>
            rowKey="id"
            dataSource={u.data}
            columns={u.columns}
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: u.listQuery.isError ? (
                <></>
              ) : (
                <Empty description={u.emptyDescription} />
              ),
            }}
            pagination={u.paginationConfig}
          />
        )}
      </div>

      <AdminUserCreateModal
        open={u.createOpen}
        form={u.createForm}
        roleOptions={u.roleOptions}
        confirmLoading={u.createPending}
        onCancel={u.closeCreate}
        onSubmit={() => void u.submitCreate().catch(() => {})}
      />

      <AdminUserEditDrawer
        user={u.editUser}
        form={u.editForm}
        roleOptions={u.roleOptions}
        loading={u.editPending}
        onClose={u.closeEdit}
        onSubmit={() => void u.submitEdit().catch(() => {})}
      />
    </>
  );
}
