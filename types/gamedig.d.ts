declare module 'gamedig' {
  const Gamedig: {
    query(options: {
      type: string
      host: string
      port: number
      socketTimeout?: number
      attemptTimeout?: number
      timeout?: number
    }): Promise<{
      players: any[]
      maxplayers: number
      map?: string
      ping?: number
      raw?: any
    }>
  }
  export = Gamedig
}

