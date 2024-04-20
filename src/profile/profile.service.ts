import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getTweetsByUser(user: User) {

    const tweets = await this.prisma.tweet.findMany({
      where: {
        userId: user.id
      }
    })

    if (tweets.length === 0) return 'No hay tweets para mostrar, crea uno!';

    return tweets;
  }

  async getCommentsByUser(user: User) {

    console.log("aca")
    const comments = await this.prisma.comment.findMany({
      where: {
        userId: user.id
      },
      select: {
        tweet: true
      }
    })

    if (comments.length === 0) return 'No hay comentarios para mostrar, crea uno!';

    return comments;
  }

  async getLikesByUser(user: User) {

    const likes = await this.prisma.like.findMany({
      where: {
        userId: user.id
      },
      select: {
        tweet: true
      }
    })

    if (likes.length === 0) return 'No hay likes para mostrar, da uno!';

    return likes;
  }

  getFollowers() { }

  getFollowings() { }

  // Prisma schema
  // model Following {
  //   id         String   @id @default(uuid())
  //   follower   User     @relation("FollowersRelation", fields: [followerId], references: [id])
  //   followerId String
  //   followed   User     @relation("FollowingRelation", fields: [followedId], references: [id])
  //   followedId String
  //   createdAt  DateTime @default(now())
  //   updatedAt  DateTime @updatedAt
  // }

  async followUser(currentUser: User, followedUserId: string) {

    const [followed, current] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: followedUserId } }),
      this.prisma.user.findUnique({ where: { id: currentUser.id } }),
    ])

    if (!followed) throw new NotFoundException('Usuario no encontrado');

    if (followed.id === current.id) throw new Error('No puedes seguirte a ti mismo');


    const following = await this.prisma.following.findFirst({
      where: {
        followerId: current.id,
        followedId: followed.id
      }
    });

    if (following) throw new Error('Ya sigues a este usuario');

    await this.createFollowing(current.id, followed.id);

    return 'Ahora sigues a ' + followed.name;
  }

  private async createFollowing(followerId: string, followedId: string) {
    return this.prisma.following.create({
      data: {
        follower: { connect: { id: followerId } },
        followed: { connect: { id: followedId } },
      },
    });
  }
}
