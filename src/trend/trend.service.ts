import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrendService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async createTrend() {

    // buscamos los hashtags mas usados
    const hashtags = await this.prisma.hashtag.findMany({
      orderBy: {
        hashtagCount: 'desc'
      },
      take: 5
    });

    // los hashtags mas usados los vamos a guardar en una tabla de tendencias
    for (const hashtag of hashtags) {
      // si el hashtag ya existe en la db no hacemos nada
      const existingTrend = await this.prisma.trend.findFirst({
        where: {
          hashtagId: hashtag.id
        }
      });

      if (!existingTrend) {
        const data = await this.prisma.trend.create({
          data: {
            hashtagId: hashtag.id,
            name: hashtag.name
          }
        })
        console.log(data);
      }
    }
  }

  async findAll() {
    const trends = await this.prisma.trend.findMany({
      include: {
        hashtag: {
          select: { hashtagCount: true }  
        }
      }
    })
    return trends;
  }
}
