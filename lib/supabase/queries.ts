import { supabase } from './client'
import { Tables, TableName, TableInsert, TableUpdate } from './client'

export async function insertRecord<T extends TableName>(
  table: T,
  data: TableInsert<T>,
  select = '*',
) {
  const { data: result, error } = await (supabase
    .from(table as any) as any)
    .insert(data as any)
    .select(select)
    .single()

  if (error) throw error
  return result
}

export async function updateRecord<T extends TableName>(
  table: T,
  id: string,
  updates: TableUpdate<T>,
  select = '*',
) {
  const { data: result, error } = await (supabase
    .from(table as any) as any)
    .update(updates as any)
    .eq('id', id)
    .select(select)
    .single()

  if (error) throw error
  return result
}

export async function deleteRecord<T extends TableName>(table: T, id: string) {
  const { error } = await (supabase.from(table as any) as any).delete().eq('id', id)
  if (error) throw error
  return { success: true }
}

// Focus Sessions
export async function createFocusSession(sessionData: TableInsert<'focus_sessions'>) {
  return insertRecord('focus_sessions', sessionData)
}

export async function getRecentFocusSessions(limit = 10) {
  const { data, error } = await (supabase
    .from('focus_sessions' as any) as any)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Reflections
export async function createReflection(reflectionData: TableInsert<'reflections'>) {
  return insertRecord('reflections', reflectionData)
}

export async function getRecentReflections(limit = 7) {
  const { data, error } = await (supabase
    .from('reflections' as any) as any)
    .select('*')
    .order('reflection_date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Pomodoro
export async function createPomodoroSession(pomodoroData: TableInsert<'pomodoro_history'>) {
  return insertRecord('pomodoro_history', pomodoroData)
}

export async function getWeeklyFocusTime(weeks = 4) {
  const { data, error } = await (supabase.rpc as any)('get_weekly_focus_time', {
    weeks_param: weeks,
  })

  if (error) throw error
  return data
}
