import { Schema, model, InferSchemaType, Types } from 'mongoose';

const gameSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        source: {
            type: String,
            default: 'chess.com', // TODO: support other sources (e.g lichess, OTB)
        },

        event: String, // e.g "Live Chess", "Play vs Bot". Denotes game type

        site: String, // generic site field e.g "chess.com", not necessarily a full URL

        date: Date, // date game was played

        white: String, // username of white player
        black: String, // username of black player

        whiteElo: Number,
        blackElo: Number,

        result: {
            type: String, // "1-0" for white win, "0-1" for black win, "1/2-1/2" for draw
            enum: ['1-0', '0-1', '1/2-1/2'],
        },

        eco: String, // 1 letter + 2 digit code representing opening (e.g "D02")
        timeControl: String, // see here: https://en.wikipedia.org/wiki/Portable_Game_Notation under "Time Control" for specs
        termination: String, // e.g "Checkmate", "Resignation", "Abandonment"
        gameUrl: String, // link to original online game

        // full raw PGN text
        pgn: {
            type: String,
            required: true,
        },

        // TODO: brainstorm game tags a user would find beneficial (e.g "opening mistake", "time trouble")
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export type Game = InferSchemaType<typeof gameSchema>;

export const GameModel = model<Game>('Game', gameSchema);
