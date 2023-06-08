import React from 'react'
import Link from 'next/link'

import { User } from '../../interfaces'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
  <div className='bg-red-500'>
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
  </div>
)

export default ListItem
