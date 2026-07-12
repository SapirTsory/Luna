import { TextField } from '../components/TextField'
import { useAnswerList, type ListKey } from '../context/OnboardingContext'

interface Column<T> {
  key: keyof T & string
  label: (index: number) => string
  placeholder?: string
  inputMode?: 'text' | 'numeric'
  flex?: number
}

interface RepeatableFieldListProps<T extends Record<string, string>> {
  listKey: ListKey
  columns: Column<T>[]
  addLabel: string
  removeLabel: (index: number) => string
  emptyItem: T
  rowClassName?: string
}

export function RepeatableFieldList<T extends Record<string, string>>({
  listKey,
  columns,
  addLabel,
  removeLabel,
  emptyItem,
  rowClassName = '',
}: RepeatableFieldListProps<T>) {
  const { items, add, update, remove } = useAnswerList<T>(listKey)

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, index) => (
        <div key={index} className={`flex items-end gap-2 ${rowClassName}`}>
          {columns.map((col) => (
            <div key={col.key} className="min-w-0" style={{ flex: col.flex ?? 1 }}>
              <TextField
                label={col.label(index)}
                placeholder={col.placeholder}
                inputMode={col.inputMode}
                value={item[col.key]}
                onChange={(e) => update(index, { [col.key]: e.target.value } as Partial<T>)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => remove(index)}
            aria-label={removeLabel(index)}
            className="mb-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-card"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => add(emptyItem)}
        className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-dashed border-border-strong py-2.5 text-sm font-bold text-primary hover:bg-card"
      >
        {addLabel}
      </button>
    </div>
  )
}
