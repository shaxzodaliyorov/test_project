import { Form, Modal } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PERMISSIONS } from '@/constants/permissions'
import { getAssignableRoleSelectOptions } from '@/constants/role-options'
import { buildAdminUsersColumns } from '@/pages/admin-users/admin-users-table-columns'
import { useAuthStore } from '@/hooks/auth-store'
import { useCanAccess } from '@/hooks/use-can-access'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useUsers } from '@/hooks/use-users'
import type { UserFormValues } from '@/types/admin-user-form'
import type { Role } from '@/types/role'
import type { User } from '@/types/user'
import { fullNameFromForm, splitStoredName } from '@/utils/admin-user-name'
import { paginationShowTotal } from '@/utils/pagination-show-total'

const PAGE_SIZE = 10

function defaultRolesForCreate(roleSlugs: Role[]): Role[] {
  if (roleSlugs.includes('reports')) return ['reports']
  if (roleSlugs.includes('payment')) return ['payment']
  if (roleSlugs.includes('users')) return ['users']
  return roleSlugs[0] ? [roleSlugs[0]] : []
}

export function useAdminUsersPage() {
  const { t } = useTranslation(['users', 'common'])
  const canWrite = useCanAccess(PERMISSIONS.USERS_WRITE)
  const currentUserId = useAuthStore((s) => s.user?.id)

  const [page, setPage] = useState(1)
  const [searchInput, setSearchInputState] = useState('')
  const debouncedSearch = useDebouncedValue(searchInput, 280)

  const setSearchInput = useCallback((value: string) => {
    setSearchInputState(value)
    setPage(1)
  }, [])

  const { listQuery, createMutation, updateMutation, deleteMutation } =
    useUsers({
      page,
      pageSize: PAGE_SIZE,
      search: debouncedSearch,
    })

  const [createOpen, setCreateOpen] = useState(false)
  const [createForm] = Form.useForm<UserFormValues>()
  const [editUser, setEditUser] = useState<User | null>(null)
  const [editForm] = Form.useForm<UserFormValues>()

  const roleOptions = useMemo(() => getAssignableRoleSelectOptions(t), [t])
  const showTotal = useMemo(() => paginationShowTotal(t), [t])

  useEffect(() => {
    if (!editUser) return
    const { firstName, lastName } = splitStoredName(editUser.name)
    editForm.setFieldsValue({
      firstName,
      lastName,
      email: editUser.email,
      roles: editUser.roles.filter((r) => r !== 'admin'),
      password: undefined,
    })
  }, [editUser, editForm])

  const openCreate = useCallback(() => {
    createForm.resetFields()
    const slugs = roleOptions.map((o) => o.value)
    createForm.setFieldsValue({
      roles: defaultRolesForCreate(slugs),
      firstName: '',
      lastName: '',
    })
    setCreateOpen(true)
  }, [createForm, roleOptions])

  const closeCreate = useCallback(() => {
    setCreateOpen(false)
    createForm.resetFields()
  }, [createForm])

  const submitCreate = useCallback(async () => {
    const v = await createForm.validateFields()
    await createMutation.mutateAsync({
      email: v.email.trim(),
      name: fullNameFromForm(v),
      password: v.password ?? '',
      roles: v.roles,
    })
    closeCreate()
  }, [closeCreate, createForm, createMutation])

  const closeEdit = useCallback(() => {
    setEditUser(null)
    editForm.resetFields()
  }, [editForm])

  const submitEdit = useCallback(async () => {
    if (!editUser) return
    const v = await editForm.validateFields()
    const body: Partial<{
      email: string
      name: string
      password: string
      roles: Role[]
    }> = {
      email: v.email.trim(),
      name: fullNameFromForm(v),
      roles: v.roles.filter((r) => r !== 'admin'),
    }
    if (v.password?.trim()) body.password = v.password.trim()
    await updateMutation.mutateAsync({ id: editUser.id, body })
    closeEdit()
  }, [closeEdit, editForm, editUser, updateMutation])

  const confirmDelete = useCallback(
    (row: User) => {
      Modal.confirm({
        title: t('users:deleteTitle'),
        content: t('users:deleteBody', { name: row.name, email: row.email }),
        okText: t('common:delete'),
        okButtonProps: { danger: true },
        cancelText: t('common:cancel'),
        onOk: () => deleteMutation.mutateAsync(row.id),
      })
    },
    [deleteMutation, t],
  )

  const emptyDescription = useMemo(
    () =>
      debouncedSearch.trim()
        ? t('users:emptySearch')
        : t('users:emptyDefault'),
    [debouncedSearch, t],
  )

  const errorDescription =
    listQuery.error instanceof Error
      ? listQuery.error.message
      : String(listQuery.error ?? t('common:unknownError'))

  const data = listQuery.data?.items ?? []
  const total = listQuery.data?.total ?? 0
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const effectivePage = Math.min(page, lastPage)

  const columns = useMemo(
    () =>
      buildAdminUsersColumns({
        t,
        page: effectivePage,
        pageSize: PAGE_SIZE,
        canWrite,
        currentUserId,
        onEdit: setEditUser,
        onDelete: confirmDelete,
      }),
    [canWrite, confirmDelete, currentUserId, effectivePage, t],
  )

  const paginationConfig = useMemo(
    () => ({
      current: effectivePage,
      pageSize: PAGE_SIZE,
      total,
      showSizeChanger: false as const,
      showTotal,
      onChange: setPage,
    }),
    [effectivePage, showTotal, total],
  )

  return {
    canWrite,
    currentUserId,
    searchInput,
    setSearchInput,
    listQuery,
    data,
    total,
    columns,
    paginationConfig,
    emptyDescription,
    errorDescription,
    createOpen,
    createForm,
    roleOptions,
    createPending: createMutation.isPending,
    openCreate,
    closeCreate,
    submitCreate,
    editUser,
    editForm,
    openEdit: setEditUser,
    editPending: updateMutation.isPending,
    closeEdit,
    submitEdit,
    confirmDelete,
  }
}
