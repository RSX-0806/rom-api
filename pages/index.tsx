import { PrismaClient } from '@prisma/client'
import { InferGetStaticPropsType } from 'next';

const prisma = new PrismaClient();

type Game = {
    id: string,
    title: string,
    genre: string,
    description: string,
    publisher: string
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const games: Game[] = await prisma.game.findMany({take: 5});
  return {
    props: {
      games
    },
  }
}

function HomePage({games}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (<table>
  	<thead>
  		<tr>
  		  <th>Title</th>
  		  <th>Genre</th>
  		  <th>Publisher</th>
  		  <th>Description</th>
  		</tr>
  	</thead>
  	<tbody>
        {games.map((game: Game, i: number) => {
           return  <tr key={i}>
                <td>{game.title}</td>
                <td>{game.genre}</td>
                <td>{game.description}</td>
                <td>{game.publisher}</td>
            </tr>
        })}
    </tbody>
    </table>)
}

export default HomePage;
