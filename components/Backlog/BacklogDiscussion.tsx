import React from "react";

interface Comment {
  user: string;
  avatar: string;
  content: string;
  date: string;
}

interface BacklogDiscussionProps {
  comments: Comment[];
  discussion: string;
  onDiscussionChange: (v: string) => void;
  onAddComment: () => void;
  loading: boolean;
}

const BacklogDiscussion: React.FC<BacklogDiscussionProps> = ({
  comments,
  discussion,
  onDiscussionChange,
  onAddComment,
  loading
}) => (
  <section className="mt-8">
    <div className="font-semibold text-gray-800 text-base mb-3 tracking-wide">Discussion</div>
    <div className="flex flex-col gap-4">
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-gray-400 text-sm">No discussion yet.</div>
      ) : (
        comments.map((comment, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
            <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs text-gray-700">{comment.user}</span>
                <span className="text-xs text-gray-400">{comment.date}</span>
              </div>
              <div className="text-sm text-gray-700 mt-1">{comment.content}</div>
            </div>
          </div>
        ))
      )}
      {/* Discussion Input */}
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Add a comment..."
          value={discussion}
          onChange={(e) => onDiscussionChange(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
          onClick={onAddComment}
          disabled={loading || !discussion.trim()}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  </section>
);

export default BacklogDiscussion;
