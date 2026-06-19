using UnityEngine;

public class EnemyAttack : MonoBehaviour, IEnemyAttackBehaviour
{
    [SerializeField] private float damage = 2f;
    [SerializeField] private float attackCooldown = 1f;

    private float lastAttackTime = -Mathf.Infinity;
    // Trigger wordt geraakt door de player collider
    private void OnTriggerStay2D(Collider2D collision)
    {
        if (Time.time < lastAttackTime + attackCooldown) return;

        lastAttackTime = Time.time;
        OnHit(collision, damage);
    }

    public void OnHit(Collider2D collision, float damage)
    {
        if (collision.TryGetComponent<IDamageablePlayer>(out var dmg))
        {
            dmg.TakeDamage(damage);
        }
    }
}
