import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop()
    royalroadId?: string;
    
    @Prop([String])
    royalroadTags?: string[];

    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Book' })
    scratchers?: MongooseSchema.Types.ObjectId[];

    @Prop()
    coverImage?: string;

    @Prop()
    description?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);