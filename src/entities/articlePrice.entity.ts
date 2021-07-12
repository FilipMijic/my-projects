import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Article } from "./article.entity";
  import * as Validator from 'class-validator';
  
  @Index("FK_article_price_article", ["articleId"], {})
  @Entity("article_price", { schema: "ekatalogzaelektronskeuredjaje" })
  export class ArticlePrice {
    @PrimaryGeneratedColumn({
      type: "int",
      name: "article_price_id",
      unsigned: true,
    })
    articlePriceId: number;
  
    @Column("int", { name: "article_id", unsigned: true })
    articleId: number;
  
    @Column("decimal", { name: "price", unsigned: true, precision: 10, scale: 2 })
    @Validator.IsNotEmpty()
    @Validator.IsNumber({allowInfinity:false,allowNaN:false,maxDecimalPlaces:2})
    @Validator.IsPositive()
    price: number;
  
    @Column("timestamp", {
      name: "created_at",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  
    @ManyToOne(() => Article, (article) => article.articlePrices, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
    article: Article;
  }
  