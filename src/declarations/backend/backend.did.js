export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  return IDL.Service({
    'addPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'getPosts' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Tuple(
              IDL.Nat,
              IDL.Record({
                'title' : IDL.Text,
                'body' : IDL.Text,
                'author' : IDL.Text,
                'timestamp' : Time,
              }),
            )
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
